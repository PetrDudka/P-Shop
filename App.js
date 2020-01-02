import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import mealsReducer from './store/reducers/meals';
import MealsNavigator from './navigation/MealsNavigator';

const rootReducer = combineReducers({
    meals: mealsReducer
});

const store = createStore(rootReducer);

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
        <Provider store={store}>
            <MealsNavigator />
        </Provider>
    );
}
