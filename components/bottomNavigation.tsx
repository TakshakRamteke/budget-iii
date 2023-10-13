import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import HomeIcon from './icons/home';
import SettingsIcon from './icons/settingsIcon';
import { usePathname } from 'expo-router';
import AnalyticsIcon from './icons/analytics';
import IncomeIcon from './icons/incomeIcon';
import ExpenseIcon from './icons/expenseIcon';

export default function BottomNavigation() {
    const pathName = usePathname();
    return (
        <View
            className='w-full flex justify-center items-center mt-auto mb-2 fixed z-50 mx-auto'
            style={{ elevation: 20 }}
        >
            <View className='w-full flex flex-row items-center justify-between border border-[#1C1C1C] rounded-full p-2.5 px-4 mt-auto fixed z-50 bg-[#1C1C1C]'>
                <Link href='/'>
                    <View className='flex flex-col items-center justify-center'>
                        <HomeIcon
                            stroke={pathName === '/' ? '#AA00FA' : 'white'}
                        />
                        <Text
                            className={`text-xs ${
                                pathName === '/'
                                    ? 'text-[#AA00FA]'
                                    : 'text-white'
                            }`}
                        >
                            Home
                        </Text>
                    </View>
                </Link>

                <Link href='/incomes'>
                    <View className='flex flex-col items-center justify-center'>
                        <IncomeIcon
                            stroke={
                                pathName.includes('/incomes')
                                    ? '#AA00FA'
                                    : 'white'
                            }
                        />
                        <Text
                            className={`text-xs ${
                                pathName === '/addIncome'
                                    ? 'text-[#AA00FA]'
                                    : 'text-white'
                            }`}
                        >
                            Incomes
                        </Text>
                    </View>
                </Link>

                <Link href='/expenses'>
                    <View className='flex flex-col items-center justify-center'>
                        <ExpenseIcon
                            stroke={
                                pathName.includes('/expenses')
                                    ? '#AA00FA'
                                    : 'white'
                            }
                        />
                        <Text
                            className={`text-xs ${
                                pathName === '/addExpense'
                                    ? 'text-[#AA00FA]'
                                    : 'text-white'
                            }`}
                        >
                            Expenses
                        </Text>
                    </View>
                </Link>

                <Link href='/analytics'>
                    <View className='flex flex-col items-center justify-center'>
                        <AnalyticsIcon
                            stroke={
                                pathName === '/analytics' ? '#AA00FA' : 'white'
                            }
                        />

                        <Text
                            className={`text-xs ${
                                pathName === '/analytics'
                                    ? 'text-[#AA00FA]'
                                    : 'text-white'
                            }`}
                        >
                            Analytics
                        </Text>
                    </View>
                </Link>

                <Link href='/settings'>
                    <View className='flex flex-col items-center justify-center'>
                        <SettingsIcon
                            stroke={
                                pathName === '/settings' ? '#AA00FA' : 'white'
                            }
                        />
                        <Text
                            className={`text-xs ${
                                pathName === '/settings'
                                    ? 'text-[#AA00FA]'
                                    : 'text-white'
                            }`}
                        >
                            Settings
                        </Text>
                    </View>
                </Link>
            </View>
        </View>
    );
}
