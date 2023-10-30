import { Button, Modal, Pressable, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import CrossIcon from '../components/icons/crossIcon';
import CategouriesModal from '../components/categouriesModal';
import RightArrow from '../components/icons/rightArrow';

export default function Settings() {
    const db = SQLite.openDatabase('dev.db');
    const [isCleaning, setIsCleaning] = useState(false);
    const [newIncomeCategory, onChangeNewIncomeCategory] = useState('');
    const [newExpenseCategory, onChangeNewExpenseCategory] = useState('');
    const [added, setAdded] = useState(false);
    const [allIncomeCategouries, setAllIncomeCategouries] = useState<
        Category[]
    >([]);
    const [allExpenseCategouries, setAllExpenseCategouries] = useState<
        Category[]
    >([]);

    const [incomesModalOpen, setIncomesModalOpen] = useState(false);
    const [expensesModalOpen, setExpensesModalOpen] = useState(false);

    function cleanDB() {
        setIsCleaning(true);
        db.exec(
            [
                { sql: 'DELETE FROM expenses', args: [] },
                { sql: 'DELETE FROM incomes', args: [] },
                { sql: 'DELETE FROM incomesCategouries', args: [] },
            ],
            false,
            () => {
                setIsCleaning(false);
                router.push('/');
            },
        );
    }

    function addIncomeCategory() {
        {
            newIncomeCategory &&
                db.transaction((tx) => {
                    setAdded(true);
                    tx.executeSql(
                        `INSERT INTO incomesCategouries (name) VALUES ("${newIncomeCategory}")`,
                        [],
                        (_, { rows }) => {
                            console.log(rows);
                            onChangeNewIncomeCategory('');
                            setAdded(false);
                        },
                        //@ts-expect-error
                        (_, error) => {
                            console.log(error);
                        },
                    );
                });
        }
    }

    function addExpenseCategory() {
        {
            newExpenseCategory &&
                db.transaction((tx) => {
                    setAdded(true);
                    tx.executeSql(
                        `INSERT INTO expensesCategouries(name) VALUES ("${newExpenseCategory}")`,
                        [],
                        (_, { rows }) => {
                            console.log(rows);
                            onChangeNewExpenseCategory('');
                            setAdded(false);
                        },
                        //@ts-expect-error
                        (_, error) => {
                            console.log(error);
                        },
                    );
                });
        }
    }

    function removeCategory(
        categoryId: number,
        type: 'incomesCategouries' | 'expensesCategouries',
    ) {
        setAdded(true);
        console.log(categoryId);
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM ${type} WHERE id=${categoryId}`,
                [],
                (_, { rows }) => {
                    setAdded(false);
                },
            );
        });
    }

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM incomesCategouries',
                [],
                (_, { rows }) => {
                    setAllIncomeCategouries(rows._array);
                },
            );

            tx.executeSql(
                'SELECT * FROM expensesCategouries',
                [],
                (_, { rows }) => {
                    setAllExpenseCategouries(rows._array);
                },
            );
        });
    }, [added, isCleaning]);

    return (
        <>
            <Text className='text-2xl font-bold text-white'>Settings</Text>

            <Pressable
                onPress={() => setIncomesModalOpen(!incomesModalOpen)}
                className='my-3 flex flex-row items-center'
            >
                <View>
                    <Text className='text-lg text-white'>
                        Income Categories
                    </Text>
                    <Text className='text-slate-500'>
                        Add or remove Categories for you incomes
                    </Text>
                </View>
                <RightArrow stroke='white' className='ml-auto w-7 h-7' />
            </Pressable>

            <Pressable
                onPress={() => setExpensesModalOpen(!expensesModalOpen)}
                className='my-3 flex flex-row items-center'
            >
                <View>
                    <Text className='text-lg text-white'>
                        Expenses Categories
                    </Text>
                    <Text className='text-slate-500'>
                        Add or remove Categories for you Expenses
                    </Text>
                </View>
                <RightArrow stroke='white' className='ml-auto w-7 h-7' />
            </Pressable>

            <CategouriesModal
                modalOpen={incomesModalOpen}
                setModalOpen={() => setIncomesModalOpen(!incomesModalOpen)}
                categories={allIncomeCategouries}
                adderFunction={() => addIncomeCategory()}
                newCategoryName={newIncomeCategory}
                onChangeNewCategoryName={onChangeNewIncomeCategory}
                added={added}
                removeCategoryFunc={removeCategory}
                type='incomesCategouries'
            />

            <CategouriesModal
                modalOpen={expensesModalOpen}
                setModalOpen={() => setExpensesModalOpen(!expensesModalOpen)}
                categories={allExpenseCategouries}
                adderFunction={() => addExpenseCategory()}
                newCategoryName={newExpenseCategory}
                onChangeNewCategoryName={onChangeNewExpenseCategory}
                added={added}
                removeCategoryFunc={removeCategory}
                type='expensesCategouries'
            />
        </>
    );
}
