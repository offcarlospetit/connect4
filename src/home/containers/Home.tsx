import { Button, StyleSheet, View } from 'react-native';
import React from 'react';
import { RootNavigationProps } from '../../navigation';


const Home: React.FC<RootNavigationProps<'Home'>> = ({ navigation }) => {
    const goTo = () => {
        navigation.navigate('HomeStack', { screen: 'Detail' });
    };
    return (
        <View style={{ flex: 1 }}>
            {/* Button to navigate */}
            <Button title="Go to Detail" onPress={goTo} />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({});