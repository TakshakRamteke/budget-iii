import { Link } from 'expo-router';
import { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { recordsContext } from '../../utils/RecordsProvider';
import Table from '../../components/table';
import TotalCard from '../../components/totalCard';

export default function Expenses() {
    const { expenses } = useContext(recordsContext) as RecordsProviderContext;

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
            <View className='my-3'>
                <Table records={expenses} />
            </View>
        </>
    );
}
