import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from '../containers/Detail';
import AutomaticPayment from '../containers/AutomaticPayment';

export type HomeStackNavigatorParams = {
    Detail: undefined;
    AutomaticPayment: undefined;
};

const Stack = createNativeStackNavigator<HomeStackNavigatorParams>();

function HomeStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="AutomaticPayment" component={AutomaticPayment} />
        </Stack.Navigator>
    );
}

export default HomeStackNavigator;