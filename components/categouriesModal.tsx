import { Button, Modal, Pressable, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import CrossIcon from '../components/icons/crossIcon';
import * as SQLite from 'expo-sqlite';
import { useState } from 'react';

export default function CategouriesModal({
    modalOpen,
    categories,
    setModalOpen,
    newCategoryName,
    onChangeNewCategoryName,
    added,
    //removing,
    adderFunction,
    removeCategoryFunc,
    type,
}: {
    modalOpen: boolean;
    categories: Category[];
    setModalOpen: (modalOpen: boolean) => void;
    newCategoryName: string;
    onChangeNewCategoryName: any; //TODO : Correct this type later
    added: boolean;
    //removing: boolean;
    adderFunction: (newCategoryName: string) => void;
    removeCategoryFunc: any; //TODO  : correct this type later
    type: 'incomesCategouries' | 'expensesCategouries';
}) {
    return (
        <>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalOpen}
                onRequestClose={() => setModalOpen(!modalOpen)}
            >
                <View className='h-1/2 mt-auto bg-[#161616] p-2 rounded-t border-t border-slate-500'>
                    <View>
                        <View className='border-b border-slate-700 flex flex-row items-center'>
                            {type == 'incomesCategouries' ? (
                                <Text className='my-3 text-lg text-white'>
                                    All Income Categories
                                </Text>
                            ) : (
                                <Text className='my-3 text-lg text-white'>
                                    All Expense Categories
                                </Text>
                            )}
                            <Pressable
                                onPress={() => setModalOpen(!modalOpen)}
                                className='ml-auto'
                            >
                                <CrossIcon stroke='white' className='w-6 h-6' />
                            </Pressable>
                        </View>
                        <ScrollView horizontal={true} className='gap-2 mt-3'>
                            {categories.map((category) => (
                                <View
                                    key={category.id}
                                    className='bg-gray-800 bg-opacity-20 rounded p-2 pl-3 w-fit flex flex-row items-center justify-center'
                                >
                                    <Text className='text-white'>
                                        {category.name}
                                    </Text>
                                    <Pressable
                                        onPress={() => {
                                            removeCategoryFunc(
                                                category.id,
                                                type,
                                            );
                                        }}
                                    >
                                        <CrossIcon
                                            stroke='white'
                                            className='w-4 h-4 ml-2'
                                        />
                                    </Pressable>
                                </View>
                            ))}
                        </ScrollView>
                        <TextInput
                            value={newCategoryName}
                            onChangeText={onChangeNewCategoryName}
                            className='bg-[#1C1C1C] p-1 px-2 text-white my-3'
                        />
                        <Pressable
                            onPress={() => adderFunction(newCategoryName)}
                            className='bg-blue-600 rounded p-2'
                        >
                            <Text className='text-white text-center'>
                                {!added ? 'Add Category' : 'Working...'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
}
