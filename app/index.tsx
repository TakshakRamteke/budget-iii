import React, { useContext, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import Table from '../components/table';
import TotalCard from '../components/totalCard';
import { recordsContext } from '../utils/RecordsProvider';

export default function Page() {
    const db = SQLite.openDatabase('dev.db');

    //    db.transaction((tx) => {
    //        tx.executeSql('DROP TABLE incomesCategouries', [], () => {
    //            console.log('Dropping incomesCategouries table');
    //        });
    //        tx.executeSql('DROP TABLE expensesCategouries', [], () => {
    //            console.log('Dropping expensesCategouries table');
    //        });
    //        tx.executeSql('DROP TABLE expenses', [], () => {
    //            console.log('Dropping expenses table');
    //        });
    //        tx.executeSql('DROP TABLE incomes', [], () => {
    //            console.log('Dropping incomes table');
    //        });
    //    });

    const { incomes, setIncomes, expenses, setExpenses } = useContext(
        recordsContext,
    ) as RecordsProviderContext;

    useEffect(() => {
        db.exec(
            [
                {
                    sql: 'CREATE TABLE IF NOT EXISTS expensesCategouries (id INTEGER PRIMARY KEY NOT NULL, name TEXT)',
                    args: [],
                },
                {
                    sql: 'CREATE TABLE IF NOT EXISTS incomesCategouries (id INTEGER PRIMARY KEY NOT NULL, name TEXT)',
                    args: [],
                },
                {
                    sql: `CREATE TABLE IF NOT EXISTS expenses (
                            id          INTEGER PRIMARY KEY NOT NULL, 
                            name        TEXT, 
                            amount      INTEGER, 
                            categoryId  INTEGER, 
                            date        TEXT, 

                            FOREIGN KEY (categoryId) REFERENCES expensesCategouries(id) ON DELETE CASCADE
                        );`,
                    args: [],
                },
                {
                    sql: `CREATE TABLE IF NOT EXISTS incomes (
                            id          INTEGER PRIMARY KEY NOT NULL, 
                            name        TEXT, 
                            amount      INTEGER, 
                            categoryId  INTEGER, 
                            date        TEXT, 
    
                            FOREIGN KEY (categoryId) REFERENCES incomesCategouries(id) ON DELETE CASCADE
                        );`,
                    args: [],
                },
            ],
            false,
            (_, errors) => {
                //@ts-expect-error
                errors.map((error) => console.log(error));
            },
        );

        db.transaction((tx) => {
            tx.executeSql(
                'SELECT expenses.*, expensesCategouries.name AS category FROM expenses LEFT JOIN expensesCategouries ON expenses.categoryId=expensesCategouries.id',
                [],
                (_, { rows }) => setExpenses(rows._array),
            );
            tx.executeSql(
                'SELECT incomes.*, incomesCategouries.name AS category FROM incomes LEFT JOIN incomesCategouries ON incomes.categoryId=incomesCategouries.id',
                [],
                (_, { rows }) => {
                    setIncomes(rows._array);
                },
            );
        });
    }, []);

    const totalIncome =
        incomes.length > 0
            ? incomes
                  .map((income) => income.amount)
                  .reduce((current, next) => {
                      return current + next;
                  })
            : 0;

    const totalExpense =
        expenses.length > 0
            ? expenses
                  .map((expense) => expense.amount)
                  .reduce((current, next) => {
                      return current + next;
                  })
            : 0;

    const totalSavings = totalIncome - totalExpense;

    return (
        <>
            <Text className='text-2xl font-bold text-white'>Home</Text>

            <View className='mt-3'>
                <View
                    className={`flex flex-row items-center border rounded p-3 mt-1.5 mb-1.5 bg-[#1C1C1C] ${
                        totalSavings < 0.4 * totalIncome
                            ? 'border-red-500'
                            : 'border-[#1C1C1C]'
                    }`}
                >
                    {totalSavings < 0.4 * totalIncome ? (
                        <>
                            <Text className='text-lg font-medium mt-auto text-slate-200'>
                                Total Savings
                            </Text>
                            <Image
                                source={require('../assets/sad_emoji.gif')}
                                className='w-6 h-6 mt-auto'
                            />
                        </>
                    ) : (
                        <>
                            <Text className='text-lg font-medium mt-auto text-slate-200'>
                                Total Savings
                            </Text>
                            <Image
                                source={require('../assets/happy_emoji.gif')}
                                className='w-6 h-6 mt-auto'
                            />
                        </>
                    )}
                    <Text className='mt-0 ml-auto font-semibold text-3xl text-white'>
                        ₹ {totalSavings.toLocaleString()}
                    </Text>
                </View>

                <TotalCard label='Total Expenses' totalAmount={totalExpense} />

                <TotalCard label='Total Income' totalAmount={totalIncome} />
            </View>

            <View className='my-3'>
                <Text className='mb-2 font-semibold text-lg text-white'>
                    Incomes
                </Text>
                <Table
                    records={incomes.sort((current, next) => {
                        //@ts-ignore
                        return new Date(next.date) - new Date(current.date);
                    })}
                    type='incomes'
                    paginate={false}
                />
            </View>

            <View className='my-3'>
                <Text className='mb-2 font-semibold text-lg text-white'>
                    Expenses
                </Text>
                <Table
                    records={expenses.sort((current, next) => {
                        //@ts-ignore
                        return new Date(next.date) - new Date(current.date);
                    })}
                    type='expenses'
                    paginate={false}
                />
            </View>
        </>
    );
}
