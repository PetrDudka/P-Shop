import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import MealsNavigator from './navigation/MealsNavigator';

const fetchEvents = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    const handleFontLoaded = () => {
        setFontLoaded(true);
    }

    if (!fontLoaded) {
        return <AppLoading startAsync={fetchEvents} onFinish={handleFontLoaded} />
    }

    return (
        <MealsNavigator />
    );
}
