import * as React from 'react';
import { CompositeScreenProps, NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStackNavigator, { HomeStackNavigatorParams } from '../home/navigation';
import BottomTabNavigator, { BottomTabNavigatorParamList } from './BottomStackNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';


export type RootNavigationParamList = {
    BottomTab: NavigatorScreenParams<BottomTabNavigatorParamList>;
    HomeStack: NavigatorScreenParams<HomeStackNavigatorParams>;
};
const Stack = createNativeStackNavigator<RootNavigationParamList>();

export type RootStackScreenProps<T extends keyof RootNavigationParamList> =
    StackScreenProps<RootNavigationParamList, T>;

export type HomeStackScreenProps<T extends keyof HomeStackNavigatorParams> =
    StackScreenProps<HomeStackNavigatorParams, T>;


export type RootNavigationProps<T extends keyof BottomTabNavigatorParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<BottomTabNavigatorParamList, T>,
        CompositeScreenProps<
            HomeStackScreenProps<keyof HomeStackNavigatorParams>,
            RootStackScreenProps<keyof RootNavigationParamList>
        >
    >;

export default function RootNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="BottomTab"
                    component={BottomTabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="HomeStack" component={HomeStackNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
