import { Slot } from 'expo-router';
import { SafeAreaView, StatusBar, View } from 'react-native';
import BottomNavigation from '../components/bottomNavigation';
import { ScrollView } from 'react-native-gesture-handler';

export default function RootLayout() {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop: StatusBar.currentHeight,
                backgroundColor: '#161616',
            }}
        >
            <View className='flex flex-col justify-between h-screen p-2.5 bg-[#161616]'>
                <StatusBar
                    barStyle={'light-content'}
                    backgroundColor={'#161616'}
                    //@ts-ignore
                    className='text-white'
                />
                <ScrollView nestedScrollEnabled={true}>
                    <Slot />
                </ScrollView>
                <BottomNavigation />
            </View>
        </SafeAreaView>
    );
}
