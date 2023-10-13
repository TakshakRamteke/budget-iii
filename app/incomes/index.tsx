import { Link } from 'expo-router';
import { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { recordsContext } from '../../utils/RecordsProvider';
import Table from '../../components/table';
import TotalCard from '../../components/totalCard';

export default function Incomes() {
    const { incomes } = useContext(recordsContext) as RecordsProviderContext;

    const totalIncome =
        incomes.length > 0
            ? incomes
                  .map((income) => income.amount)
                  .reduce((current, next) => {
                      return current + next;
                  })
            : 0;

    return (
        <>
            <View className='flex flex-row items-center mb-3'>
                <Text className='text-2xl font-bold text-white'>
                    All Incomes
                </Text>
                <Link href='/incomes/addIncome' className='ml-auto'>
                    <Text className={`text-blue-500 text-lg`}>Add</Text>
                </Link>
            </View>
            <TotalCard label='Total Income' totalAmount={totalIncome} />
            <View className='my-3'>
                <Table records={incomes} />
            </View>
        </>
    );
}
