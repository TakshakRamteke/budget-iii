import { Link } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { recordsContext } from '../../utils/RecordsProvider';
import Table from '../../components/table';
import TotalCard from '../../components/totalCard';
import { ScrollView } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import moment from 'moment';
import { datesContext } from '../../utils/DateProvider';

export default function Expenses() {
    const db = SQLite.openDatabase('dev.db');

    const { expenses, setExpenses } = useContext(
        recordsContext,
    ) as RecordsProviderContext;

    const { month, fromDate, toDate } = useContext(datesContext);

    useEffect(() => {
        console.log(
            'fromDate:',
            moment(fromDate).format('Do MMM YYYY, hh:mm'),
            'toDate:',
            moment(toDate).format('Do MMM YYYY, hh:mm'),
        );

        db.transaction((tx) => {
            tx.executeSql(
                'SELECT expenses.*, expensesCategouries.name AS category FROM expenses LEFT JOIN expensesCategouries ON expenses.categoryId=expensesCategouries.id ORDER BY expenses.date DESC',
                [],
                (_, { rows }) => {
                    setExpenses(
                        rows._array.filter(
                            (expense) =>
                                moment(expense.date, 'DD/MM/YYYY') >=
                                    fromDate &&
                                toDate > moment(expense.date, 'DD/MM/YYYY'),
                        ),
                    );
                },
            );
        });
    }, []);

    const allCategouries: string[] = [];
    expenses.map((expense) => {
        if (!allCategouries.includes(expense.category)) {
            allCategouries.push(expense.category);
        }
    });

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
            <View className='flex flex-row items-center mb-3'>
                <Text className='text-2xl font-bold text-white'>
                    All Expenses
                </Text>
                <Link href='/expenses/addExpense' className='ml-auto'>
                    <Text className={`text-blue-500 text-lg`}>Add</Text>
                </Link>
            </View>
            <TotalCard label='Total Expenses' totalAmount={totalExpense} />
            <ScrollView horizontal={true} className='mt-3 mb-2 gap-x-2'>
                {allCategouries.sort().map((category) => (
                    <View
                        key={Math.random() * 10}
                        className='bg-[#1C1C1C] p-2 rounded flex flex-row items-baseline shadow'
                    >
                        <Text className='text-white'>{category}</Text>
                        <Text className='text-white text-xl font-semibold ml-7'>
                            ₹{' '}
                            {expenses
                                .filter(
                                    (expense) => expense.category === category,
                                )
                                .map((expense) => expense.amount)
                                .reduce((current, next) => {
                                    return current + next;
                                })
                                .toLocaleString()}
                        </Text>
                    </View>
                ))}
            </ScrollView>
            <View className='my-3'>
                <Table records={expenses} type='expenses' paginate={true} />
            </View>
        </>
    );
}
