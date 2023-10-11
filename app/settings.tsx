import { Pressable, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState } from 'react';
import { router } from 'expo-router';

export default function Settings() {
    const db = SQLite.openDatabase('dev.db');
    const [isCleaning, setIsCleaning] = useState(false);

    function cleanDB() {
        setIsCleaning(true);
        db.exec(
            [
                { sql: 'DELETE FROM expenses', args: [] },
                { sql: 'DELETE FROM incomes', args: [] },
            ],
            false,
            () => {
                setIsCleaning(false);
                router.push('/');
            },
        );
    }

    return (
        <>
            <Text className='text-2xl font-bold text-white'>Settings</Text>

            <Pressable
                className={`mt-5 p-2 rounded ${
                    isCleaning ? 'bg-red-200' : 'bg-red-400'
                }`}
                onPress={cleanDB}
                disabled={isCleaning}
            >
                <Text className='text-white font-bold text-center'>
                    {isCleaning ? 'Cleaning...' : 'Clean Database'}
                </Text>
            </Pressable>
        </>
    );
}
