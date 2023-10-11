import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function AddExpense() {
    const db = SQLite.openDatabase('dev.db');

    const [loading, setLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [newName, onChangeNewName] = useState('');
    const [newAmount, onChangeNewAmount] = useState('');
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [newCategory, setNewCategory] = useState(null);
    const [avaliableCategouries, setAvaliableCategouries] = useState([
        { label: 'Others', value: 'others' },
        { label: 'Home', value: 'home' },
        { label: 'Food', value: 'food' },
        { label: 'Fuel', value: 'fuel' },
        { label: 'Books', value: 'books' },
        { label: 'Medical', value: 'medical' },
        { label: 'Projects', value: 'projects' },
        { label: 'Expenses', value: 'expenses' },
        { label: 'Productive', value: 'productive' },
        { label: 'Entertainment', value: 'entertainment' },
    ]);
    const [newDate, setNewDate] = useState(new Date());

    DropDownPicker.setTheme('DARK');

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

    function addExpense() {
        if (newName && newAmount) {
            db.transaction((tx) => {
                setIsAdding(true);
                tx.executeSql(
                    `INSERT INTO expenses (amount, name, date, category) VALUES (${parseInt(
                        newAmount,
                    )}, "${newName}","${newDate}","${newCategory}")`,
                    [],
                    (_, { rows }) => {
                        setIsAdding(false);
                        setNewCategory(null);
                        onChangeNewAmount('');
                        onChangeNewName('');
                        router.push('/');
                    },
                );
            });
        }
    }

    return (
        <>
            <View className='flex flex-row items-center'>
                <Text className='text-2xl font-bold text-white'>
                    Add Expense
                </Text>
                <Pressable onPress={addExpense} className='ml-auto'>
                    <Text
                        className={`${
                            isAdding ? 'text-blue-200' : 'text-blue-500'
                        } text-lg`}
                    >
                        Add
                    </Text>
                </Pressable>
            </View>

            <View className='my-3'>
                <Text className='text-white'>Name : </Text>
                <TextInput
                    onChangeText={onChangeNewName}
                    value={newName}
                    className='border bg-[#1c1c1c] text-white rounded-sm my-2 p-0.5 px-3 border-[#1C1C1C]'
                />

                <Text className='text-white'>Amount : </Text>
                <TextInput
                    onChangeText={onChangeNewAmount}
                    value={newAmount}
                    className='border rounded-sm my-2 p-0.5 px-3 bg-[#1C1C1C] border-[#1C1C1C] text-white'
                />
                <Text className='text-white'>Category : </Text>
                <DropDownPicker
                    open={dropDownOpen}
                    value={newCategory}
                    items={avaliableCategouries}
                    setOpen={setDropDownOpen}
                    setValue={setNewCategory}
                    setItems={setAvaliableCategouries}
                    //@ts-ignore
                    className='rounded-sm text-white my-2 text-sm p-0.5 px-3 bg-[#1c1c1c] border-0'
                    listMode='MODAL'
                    modalContentContainerStyle={{
                        backgroundColor: '#1C1C1C',
                        borderColor: '#1C1C1C',
                        paddingBottom: 20,
                    }}
                />
                <Text className='text-white'>Date : </Text>
                <Pressable
                    onPressIn={showDatepicker}
                    onPressOut={showTimePicker}
                >
                    <Text className='border rounded-sm my-2 p-2.5 px-3 text-white bg-[#1C1C1C] border-[#1C1C1C]'>
                        {moment(newDate).format('Do MMM yyyy, h:mm a')}
                    </Text>
                </Pressable>
            </View>
        </>
    );
}
