import { Button, Pressable, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import CrossIcon from '../components/icons/crossIcon';

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

            <View>
                <Text className='my-3 text-lg text-white'>
                    All Income Categories
                </Text>
                <ScrollView horizontal={true} className='gap-2'>
                    {allIncomeCategouries.map((incomeCategory) => (
                        <View
                            key={incomeCategory.id}
                            className='bg-gray-800 bg-opacity-20 rounded p-2 pl-3 w-fit flex flex-row items-center justify-center'
                        >
                            <Text className='text-white'>
                                {incomeCategory.name}
                            </Text>
                            <Pressable
                                onPress={() => {
                                    setIsCleaning(true);
                                    db.transaction((tx) => {
                                        tx.executeSql(
                                            `DELETE FROM incomesCategouries WHERE id=${incomeCategory.id}`,
                                            [],
                                            (_, { rows }) => {
                                                setIsCleaning(false);
                                            },
                                        );
                                    });
                                }}
                            >
                                <CrossIcon
                                    stroke='white'
                                    className='w-4 h-4 ml-2'
                                />
                            </Pressable>
                        </View>
                    ))}
                </ScrollView>
                <TextInput
                    value={newIncomeCategory}
                    onChangeText={onChangeNewIncomeCategory}
                    className='bg-[#1C1C1C] p-1 px-2 text-white my-3'
                />
                <Pressable
                    onPress={addIncomeCategory}
                    className='bg-green-500 rounded p-2'
                >
                    <Text className='text-white text-center'>
                        {!added ? 'Add Income Category' : 'Adding...'}
                    </Text>
                </Pressable>
            </View>

            <View className='my-3'>
                <Text className='mb-3 text-lg text-white'>
                    All Expenses Categories
                </Text>
                <ScrollView horizontal={true} className='gap-2'>
                    {allExpenseCategouries.map((expenseCategory) => (
                        <View
                            key={expenseCategory.id}
                            className='bg-gray-800 bg-opacity-20 rounded p-2 pl-3 w-fit flex flex-row items-center justify-center'
                        >
                            <Text className='text-white'>
                                {expenseCategory.name}
                            </Text>
                            <Pressable
                                onPress={() => {
                                    setIsCleaning(true);
                                    db.transaction((tx) => {
                                        tx.executeSql(
                                            `DELETE FROM expensesCategouries WHERE id=${expenseCategory.id}`,
                                            [],
                                            (_, { rows }) => {
                                                setIsCleaning(false);
                                            },
                                        );
                                    });
                                }}
                            >
                                <CrossIcon
                                    stroke='white'
                                    className='w-4 h-4 ml-2'
                                />
                            </Pressable>
                        </View>
                    ))}
                </ScrollView>
                <TextInput
                    value={newExpenseCategory}
                    onChangeText={onChangeNewExpenseCategory}
                    className='bg-[#1C1C1C] p-1 px-2 text-white my-3'
                />
                <Pressable
                    onPress={addExpenseCategory}
                    className={`bg-blue-600 rounded p-2`}
                >
                    <Text className='text-white text-center'>
                        {!added ? 'Add Expense Category' : 'Adding...'}
                    </Text>
                </Pressable>
            </View>
        </>
    );
}
