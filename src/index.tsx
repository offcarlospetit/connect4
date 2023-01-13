import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ThemeProvider } from './uikit';
import RootNavigation from './navigation';

type Props = {};

const App: React.FC<Props> = (props: Props) => {
    return (
        <ThemeProvider>
            <RootNavigation />
        </ThemeProvider>
    );
};

export default App;

const styles = StyleSheet.create({});