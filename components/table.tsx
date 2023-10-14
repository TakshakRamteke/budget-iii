import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, FlatList } from 'react-native';
import moment from 'moment';

export default function Table({ records }: { records: Expense[] }) {
    const tableHeaders = [
        {
            id: -1,
            name: 'Name',
            amount: 'Amount',
            category: 'Category',
            date: 'Date',
        },
    ];

    return (
        <ScrollView horizontal={true}>
            <FlatList
                data={[...tableHeaders, ...records]}
                renderItem={(record) => (
                    <>
                        <View className='flex flex-row items-center border-slate-600'>
                            <Text
                                className={`text-white w-44 border-x border-b border-slate-600 p-2 ${
                                    record.index === 0
                                        ? 'border-t bg-[#1C1C1C] rounded-tl'
                                        : ''
                                } ${
                                    record.index === records.length
                                        ? 'rounded-bl'
                                        : ''
                                }`}
                            >
                                {record.item.name}
                            </Text>
                            <Text
                                className={`text-white w-24 text-right border-r border-b border-slate-600 p-2 px-3 ${
                                    record.index === 0
                                        ? 'border-t bg-[#1C1C1C]'
                                        : ''
                                }`}
                            >
                                ₹ {record.item.amount.toLocaleString()}
                            </Text>
                            <Text
                                className={`text-white w-32 text-center border-r border-b border-slate-600 p-2 capitalize ${
                                    record.index === 0
                                        ? 'border-t bg-[#1C1C1C]'
                                        : ''
                                }`}
                            >
                                {record.item.category}
                            </Text>
                            <Text
                                className={`text-white w-44 text-right border-r border-b border-slate-600 p-2 ${
                                    record.index === 0
                                        ? 'border-t bg-[#1C1C1C] rounded-tr'
                                        : ''
                                } ${
                                    record.index === records.length
                                        ? 'rounded-br'
                                        : ''
                                }`}
                            >
                                {record.index === 0
                                    ? record.item.date
                                    : moment(new Date(record.item.date)).format(
                                          'Do MMM yyyy, h:mm a',
                                      )}
                            </Text>
                        </View>
                    </>
                )}
            />
        </ScrollView>
    );
}
