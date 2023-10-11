import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import Table from '../components/table';
import TotalCard from '../components/totalCard';

export default function Page() {
    const db = SQLite.openDatabase('dev.db');

    //    db.transaction((tx) => {
    //        tx.executeSql('DROP TABLE expenses', [], () => {
    //            console.log('Dropping expenses table');
    //        });
    //        tx.executeSql('DROP TABLE incomes', [], () => {
    //            console.log('Dropping incomes table');
    //        });
    //    });

    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [incomes, setIncomes] = useState<Income[]>([]);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY NOT NULL, name TEXT, amount INTEGER, category TEXT, date TEXT)`,
            );
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS incomes (id INTEGER PRIMARY KEY NOT NULL, name TEXT, amount INTEGER, category TEXT, date TEXT)`,
            );
        });

        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM expenses', [], (_, { rows }) =>
                setExpenses(rows._array),
            );
            tx.executeSql('SELECT * FROM incomes', [], (_, { rows }) =>
                setIncomes(rows._array),
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

    return (
        <>
            <Text className='text-2xl font-bold text-white'>Home</Text>

            <View className='mt-3'>
                <TotalCard
                    label='Total Savings'
                    totalAmount={totalIncome - totalExpense}
                />

                <TotalCard label='Total Expenses' totalAmount={totalExpense} />

                <TotalCard label='Total Income' totalAmount={totalIncome} />
            </View>

            <View className='my-3'>
                <Text className='mb-2 font-semibold text-lg text-white'>
                    Incomes
                </Text>
                <Table records={incomes} />
            </View>

            <View className='my-3'>
                <Text className='mb-2 font-semibold text-lg text-white'>
                    Expenses
                </Text>
                <Table records={expenses} />
            </View>
        </>
    );
}
