import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import * as SQLite from 'expo-sqlite';

export default async function importDataBase() {
    const documentRequest = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
    });

    if (!documentRequest.canceled) {
        console.log(documentRequest);
        if (
            !(
                await FileSystem.getInfoAsync(
                    FileSystem.documentDirectory + 'SQLite',
                )
            ).exists
        ) {
            await FileSystem.makeDirectoryAsync(
                FileSystem.documentDirectory + 'SQLite',
            );
        }
        const selectedDBFile = await FileSystem.readAsStringAsync(
            documentRequest.assets[0].uri,
            {
                encoding: FileSystem.EncodingType.Base64,
            },
        );
        await FileSystem.writeAsStringAsync(
            FileSystem.documentDirectory + 'SQLite/imported.db',
            selectedDBFile,
            { encoding: FileSystem.EncodingType.Base64 },
        );

        const currentDB = SQLite.openDatabase('dev.db');

        const importedDB = SQLite.openDatabase('imported.db');
        importedDB.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM expensesCategouries',
                [],
                (_, { rows }) => {
                    rows._array.map((importedExpenseCategory) => {
                        currentDB.transaction((tx) => {
                            tx.executeSql(
                                `INSERT INTO expensesCategouries (name) VALUES ("${importedExpenseCategory.name}")`,
                                [],
                            );
                        });
                    });
                },
            );

            tx.executeSql(
                'SELECT * FROM incomesCategouries',
                [],
                (_, { rows }) => {
                    rows._array.map((importedIncomesCategory) => {
                        currentDB.transaction((tx) => {
                            tx.executeSql(
                                `INSERT INTO incomesCategouries (name) VALUES ("${importedIncomesCategory.name}")`,
                                [],
                            );
                        });
                    });
                },
            );

            tx.executeSql('SELECT * FROM incomes', [], (_, { rows }) => {
                rows._array.map((importedIncome) => {
                    currentDB.transaction((tx) => {
                        tx.executeSql(
                            `INSERT INTO incomes (amount,name,categoryId,date,time) VALUES (${parseInt(
                                importedIncome.amount,
                            )},"${importedIncome.name}",${parseInt(
                                importedIncome.categoryId.toString(),
                            )},"${importedIncome.date}","${
                                importedIncome.time
                            }")`,
                            [],
                        );
                    });
                });
            });

            tx.executeSql('SELECT * FROM expenses', [], (_, { rows }) => {
                rows._array.map((importedExpense) => {
                    currentDB.transaction((tx) => {
                        tx.executeSql(
                            `INSERT INTO expenses (amount,name,categoryId,date,time) VALUES (${parseInt(
                                importedExpense.amount,
                            )},"${importedExpense.name}",${parseInt(
                                importedExpense.categoryId.toString(),
                            )},"${importedExpense.date}","${
                                importedExpense.time
                            }")`,
                            [],
                        );
                    });
                });
            });
        });

        setTimeout(() => {
            router.push('/');
        }, 1000);
    }
}
