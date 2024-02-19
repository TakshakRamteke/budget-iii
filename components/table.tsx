import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, FlatList, Pressable } from 'react-native';
import moment from 'moment';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Table({
    records,
    type,
    paginate,
}: {
    records: Expense[];
    type: 'incomes' | 'expenses';
    paginate: boolean;
}) {
    const tableHeaders = [
        {
            id: -1,
            name: 'Name',
            amount: 'Amount',
            category: 'Category',
            date: 'Date',
            time: 'time',
        },
    ];

    const baseOffset = 7;
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(baseOffset);
    const [hasToBePaginated, setHasToBePaginated] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);
    const [canGoBackward, setCanGoBackward] = useState(false);

    useEffect(() => {
        if (records.length > endIndex) {
            setHasToBePaginated(true);
            setCanGoForward(true);
        }
    }, []);

    useEffect(() => {
        if (startIndex > 0) {
            setCanGoBackward(true);
        }
        if (startIndex == 0) {
            setCanGoBackward(false);
        }
        if (endIndex >= records.length) {
            setCanGoForward(false);
        }
        if (endIndex < records.length) {
            setCanGoForward(true);
        }
    }, [startIndex, endIndex]);

    return (
        <>
            <ScrollView horizontal={true}>
                <FlatList
                    data={[
                        ...tableHeaders,
                        ...records.slice(startIndex, endIndex),
                    ]}
                    renderItem={(record) => (
                        <>
                            <View className='flex flex-row items-center border-slate-600'>
                                <Text
                                    className={`text-white w-48 border-x border-b border-slate-600 p-2 decoration-slate-300 ${
                                        record.index === 0
                                            ? 'border-t bg-[#1C1C1C] rounded-tl'
                                            : 'underline'
                                    } ${
                                        record.index === endIndex
                                            ? 'rounded-bl'
                                            : ''
                                    }`}
                                    style={{ textDecorationColor: 'gray' }}
                                >
                                    {
                                        //@ts-ignore
                                        record.item.id > 0 ? (
                                            <Link
                                                href={{
                                                    pathname: `/${type}/[id]`,
                                                    params: {
                                                        id: record.item.id,
                                                    },
                                                }}
                                            >
                                                {record.item.name.length <= 20
                                                    ? record.item.name
                                                    : record.item.name.slice(
                                                          0,
                                                          20,
                                                      ) + '...'}
                                            </Link>
                                        ) : (
                                            `${record.item.name}`
                                        )
                                    }
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
                                    className={`text-white w-48 text-right border-r border-b border-slate-600 p-2 ${
                                        record.index === 0
                                            ? 'border-t bg-[#1C1C1C] rounded-tr'
                                            : ''
                                    } ${
                                        record.index === endIndex
                                            ? 'rounded-br'
                                            : ''
                                    }`}
                                >
                                    {record.index === 0
                                        ? record.item.date
                                        : moment(
                                              record.item.date,
                                              'DD/MM/YYYY',
                                          ).format('Do MMM YYYY') +
                                          ', ' +
                                          moment(
                                              record.item.time,
                                              'hh:mm:ss',
                                          ).format('hh:mm a')}
                                </Text>
                            </View>
                        </>
                    )}
                />
            </ScrollView>
            {paginate && hasToBePaginated ? (
                <View className='flex flex-row my-2 ml-auto border border-slate-600 rounded'>
                    <Pressable
                        className={`p-1 ${
                            canGoBackward ? 'bg-[#1C1C1C]' : 'bg-[#161616]'
                        } rounded-sm px-4 border-r border-slate-600`}
                        onPress={() => {
                            if (canGoBackward) {
                                setEndIndex(startIndex);
                                setStartIndex(startIndex - baseOffset);
                            }
                        }}
                    >
                        <Text
                            className={`${
                                canGoBackward ? 'text-white' : 'text-slate-600'
                            }`}
                        >
                            Prev
                        </Text>
                    </Pressable>
                    <Pressable
                        className={`p-1 ${
                            canGoForward ? 'bg-[#1C1C1C]' : 'bg-[#161616]'
                        } rounded-sm px-4`}
                        onPress={() => {
                            if (canGoForward) {
                                setStartIndex(endIndex);
                                setEndIndex(endIndex + baseOffset);
                            }
                        }}
                    >
                        <Text
                            className={`${
                                canGoForward ? 'text-white' : 'text-slate-600'
                            }`}
                        >
                            Next
                        </Text>
                    </Pressable>
                </View>
            ) : null}
        </>
    );
}
