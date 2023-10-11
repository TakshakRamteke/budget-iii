import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import FileSystem from 'expo-file-system';

export async function openDatabase(
    pathToDatabaseFile: string,
): Promise<SQLite.Database> {
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
    await FileSystem.downloadAsync(
        Asset.fromModule(require(pathToDatabaseFile)).uri,
        FileSystem.documentDirectory + 'SQLite/budgetiii.db',
    );
    return SQLite.openDatabase('budgetiii.db');
}
