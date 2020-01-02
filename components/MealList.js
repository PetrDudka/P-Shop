import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from '../components/MealItem';

const MealList = ({ listData, navigation }) => {
    const favouriteMeals = useSelector(state => state.meals.favouriteMeals);
    const handleMoveToDetails = (mealId, mealTitle, isFavourite) => () => {
        navigation.navigate('MealDetail', { mealId: mealId, mealTitle: mealTitle, isFav: isFavourite });
    }

    const renderMealItem = itemData => {
        const isFavourite = favouriteMeals.some(meal => meal.id === itemData.item.id);

        return (
            <MealItem 
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability} 
                onSelectMeal={handleMoveToDetails(itemData.item.id, itemData.item.title, isFavourite)} />
        );
    };

    return (
        <View style={styles.list}>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={listData}
                renderItem={renderMealItem}
                style={{width: '100%', padding: 10}} />
        </View>
    )
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MealList;