import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ThemeProvider } from './uikit';

type Props = {};

const App: React.FC<Props> = (props: Props) => {
    return (
        <ThemeProvider>
            <View>
                <Text>index</Text>
            </View>
        </ThemeProvider>
    );
};

export default App;

const styles = StyleSheet.create({});