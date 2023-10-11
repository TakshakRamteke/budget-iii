import { Text, View } from 'react-native';

export default function TotalCard({
    label,
    totalAmount,
}: {
    label: string;
    totalAmount: number;
}) {
    return (
        <>
            <View className='flex flex-row items-center border border-[#1C1C1C] rounded p-3 mt-1.5 mb-1.5 bg-[#1C1C1C]'>
                <Text className='text-lg font-medium mt-auto text-slate-200'>
                    {label}
                </Text>
                <Text className='mt-0 ml-auto font-semibold text-3xl text-white'>
                    ₹ {totalAmount.toLocaleString()}
                </Text>
            </View>
        </>
    );
}
