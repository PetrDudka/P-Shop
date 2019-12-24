import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';
import HeaderButton from '../components/HeaderButton';

const FavouritesScreen = (props) => {
    const displayMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2');

    return (
        <MealList listData={displayMeals} navigation={props.navigation} />
    )
};

FavouritesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Favourites',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={() => {navData.navigation.toggleDrawer()}} />
            </HeaderButtons>
        )
    }
};

export default FavouritesScreen;