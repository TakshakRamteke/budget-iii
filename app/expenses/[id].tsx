import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as SQLite from 'expo-sqlite';
import moment from 'moment';

export default function ExpensePage() {
    const { id } = useLocalSearchParams();

    const db = SQLite.openDatabase('dev.db');
    const [expense, setExpense] = useState<Income>();
    const [newName, onChangeNewName] = useState('');
    const [newAmount, onChangeNewAmount] = useState('');
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [newCategory, setNewCategory] = useState<number>(-1);
    const [avaliableCategouries, setAvaliableCategouries] = useState<
        Category[]
    >([]);
    const [newDate, setNewDate] = useState(new Date());
    const [isAdding, setIsAdding] = useState(false);

    DropDownPicker.setTheme('DARK');

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM expensesCategouries',
                [],
                (_, { rows }) => {
                    setAvaliableCategouries(rows._array);
                },
            );
        });

        db.transaction((tx) =>
            tx.executeSql(
                `SELECT expenses.*, expensesCategouries.name AS category FROM expenses LEFT JOIN expensesCategouries ON expenses.categoryId=expensesCategouries.id WHERE expenses.id=${id}`,
                [],
                (_, { rows }) => {
                    setExpense(rows._array[0]);
                    onChangeNewName(rows._array[0].name);
                    onChangeNewAmount(rows._array[0].amount);
                    setNewCategory(rows._array[0].categoryId);
                    setNewDate(new Date(rows._array[0].date));
                },
            ),
        );
    }, []);

    function deleteRecord() {
        db.transaction((tx) =>
            tx.executeSql(`DELETE FROM expenses WHERE id=${id}`, [], () => {
                router.back();
            }),
        );
    }

    function updateRecord() {
        db.transaction((tx) =>
            tx.executeSql(
                `UPDATE expenses SET name="${newName}", amount=${parseInt(
                    newAmount,
                )}, categoryId=${parseInt(
                    newCategory.toString(),
                )}, date="${newDate}" WHERE id=${id};`,
                [],
                () => {
                    router.back();
                },
            ),
        );
    }

    function onChange(event: any, selectedDate: any | Date) {
        const newDate = selectedDate;
        setNewDate(newDate);
    }

    function showMode(modeName: any) {
        DateTimePickerAndroid.open({
            value: newDate,
            onChange,
            mode: modeName,
        });
    }

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimePicker = () => {
        showMode('time');
    };
    return (
        <>
            <View className='flex flex-row items-center'>
                <Text className='text-2xl font-bold text-white'>
                    {expense?.name}
                </Text>
            </View>
            <View className='my-3'>
                <Text className='text-white'>Name : </Text>
                <TextInput
                    value={newName}
                    onChangeText={onChangeNewName}
                    className='border rounded-sm my-2 p-0.5 px-3 text-white border-[#1C1C1C] bg-[#1C1C1C]'
                />

                <Text className='text-white'>Amount : </Text>
                <TextInput
                    value={newAmount.toLocaleString()}
                    onChangeText={onChangeNewAmount}
                    className='border rounded-sm my-2 p-0.5 px-3 text-white border-[#1C1C1C] bg-[#1C1C1C]'
                />

                <Text className='text-white'>Category : </Text>
                <DropDownPicker
                    open={dropDownOpen}
                    value={newCategory}
                    schema={{
                        label: 'name',
                        value: 'id',
                    }}
                    //@ts-ignore
                    items={avaliableCategouries}
                    setOpen={setDropDownOpen}
                    setValue={setNewCategory}
                    setItems={setAvaliableCategouries}
                    //@ts-ignore
                    className='rounded-sm my-2 text-white text-sm p-0.5 px-3 bg-[#1c1c1c] border-0'
                    listMode='MODAL'
                    modalContentContainerStyle={{
                        backgroundColor: '#1C1C1C',
                        borderColor: '#1C1C1C',
                    }}
                />

                <Text className='text-white'>Date : </Text>
                <Pressable onPressIn={showDatepicker}>
                    <Text className='border rounded-sm my-2 p-2.5 px-3 text-white border-[#1C1C1C] bg-[#1C1C1C]'>
                        {moment(newDate).format('Do MMM yyyy')}
                    </Text>
                </Pressable>

                <Text className='text-white'>Time: </Text>
                <Pressable onPressIn={showTimePicker}>
                    <Text className='border rounded-sm my-2 p-2.5 px-3 text-white bg-[#1C1C1C] border-[#1C1C1C]'>
                        {moment(newDate).format('hh:mm a')}
                    </Text>
                </Pressable>
            </View>
            <View>
                <Pressable
                    className='bg-blue-500 rounded p-2 mb-3 mt-1.5'
                    onPress={updateRecord}
                >
                    <Text className='text-white text-center'>
                        Update record
                    </Text>
                </Pressable>
                <Pressable
                    className='bg-red-500 rounded p-2'
                    onPress={deleteRecord}
                >
                    <Text className='text-white text-center'>
                        Delete record
                    </Text>
                </Pressable>
            </View>
        </>
    );
}
