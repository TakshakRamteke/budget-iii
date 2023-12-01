import { Text, View } from 'react-native';
import { ContributionGraph, LineChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { recordsContext } from '../utils/RecordsProvider';
import { useContext } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: () => `rgba(255, 255, 255, 0.7)`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
};

export default function AnalyticsScreen() {
    const { incomes, expenses } = useContext(
        recordsContext,
    ) as RecordsProviderContext;

    console.log(
        expenses.map((expense) => {
            return expense.date;
        }),
    );

    const screenWidth = Dimensions.get('window').width;

    const data = {
        labels: [
            ...new Set(
                expenses
                    .map((expense) => {
                        return expense.date.slice(0, 2);
                    })
                    .reverse(),
            ),
        ],
        datasets: [
            {
                data: [
                    ...new Set(
                        expenses
                            .map((expense) => {
                                return expense.amount;
                            })
                            .reverse(),
                    ),
                ],
                color: () => `rgba(170, 0, 250, 1)`,
                strokeWidth: 3,
            },
        ],

        legend: [
            `${new Date().toLocaleString('default', {
                month: 'long',
            })} Expenses`,
        ],
    };

    return (
        <>
            <Text className='text-2xl font-bold text-white'>Analytics</Text>
            <ScrollView horizontal={true} className='my-3'>
                <LineChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                />
            </ScrollView>
            <ScrollView horizontal={true}></ScrollView>
        </>
    );
}
