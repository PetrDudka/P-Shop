import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavourite } from '../store/actions/meals';

const ListItem = props => (
    <View style={styles.listItem}>
        <DefaultText>{props.children}</DefaultText>
    </View>
)

const MealDetailsScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals);
    
    const mealId = props.navigation.getParam('mealId');
    const currentIsFav = useSelector(state => state.meals.favouriteMeals.some(meal => meal.id === mealId));
    const dispatch = useDispatch();
    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    const toggleFavouriteHandler = useCallback(() => {
        dispatch(toggleFavourite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({toggleFav: toggleFavouriteHandler});
    }, [toggleFavouriteHandler]);

    useEffect(() => {
        props.navigation.setParams({isFav: currentIsFav});
    }, [currentIsFav]);

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient => (
                <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step => (
                <ListItem key={step}>{step}</ListItem>
            ))}
        </ScrollView>
    )
};

MealDetailsScreen.navigationOptions = navigationData => {
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavouriteHandler = navigationData.navigation.getParam('toggleFav');
    const isFav = navigationData.navigation.getParam('isFav');

    return {
        headerTitle: mealTitle,
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Favourite" iconName={isFav ? "ios-star" : 'ios-star-outline'} onPress={() => toggleFavouriteHandler()} />
            </HeaderButtons>
          )
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 25,
        textAlign: 'center'
    },
    listItem: {
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1
    }
});

export default MealDetailsScreen;