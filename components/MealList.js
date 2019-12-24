import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import MealItem from '../components/MealItem';

const MealList = ({ listData, navigation }) => {
    const handleMoveToDetails = mealId => () => {
        navigation.navigate('MealDetail', { mealId: mealId });
    }

    const renderMealItem = itemData => {
        return (
            <MealItem 
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability} 
                onSelectMeal={handleMoveToDetails(itemData.item.id)} />
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