import { useEffect, useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as SQLite from 'expo-sqlite';
import moment from 'moment';
import { router } from 'expo-router';

export default function AddIncome() {
    const db = SQLite.openDatabase('dev.db');

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
                'SELECT * FROM incomesCategouries',
                [],
                (_, { rows }) => {
                    console.log(rows._array);
                    setAvaliableCategouries(rows._array);
                },
            );
        });
    }, []);

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

    function addIncome() {
        if (newName && newAmount) {
            db.transaction((tx) => {
                setIsAdding(true);
                tx.executeSql(
                    `INSERT INTO incomes (amount,name,categoryId,date) VALUES (${parseInt(
                        newAmount,
                    )},"${newName}",${parseInt(
                        newCategory.toString(),
                    )},"${new Date(newDate)}")`,
                    [],
                    (_, { rows }) => {
                        setIsAdding(false);
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
                    Add Income
                </Text>
                <Pressable onPress={addIncome} className='ml-auto'>
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
                    value={newName}
                    onChangeText={onChangeNewName}
                    className='border rounded-sm my-2 p-0.5 px-3 text-white border-[#1C1C1C] bg-[#1C1C1C]'
                />

                <Text className='text-white'>Amount : </Text>
                <TextInput
                    value={newAmount}
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
        </>
    );
}
