import React, { useState } from 'react';
import { StyleSheet, View,  Button, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  //console.log("Re-rendering courses");
  //console.log(courseGoals);

  //Add a new Course (id and value)
  const addGoalHandler = (goalTitle) => {
    //console.log(enteredGoal);
    if(goalTitle.length === 0){
      return;
    }
    //Apply all the state changes once
    setCourseGoals(currentGoals => [...courseGoals, { id: Math.random().toString(), value: goalTitle }]);
    setIsAddMode(false);
  }

  //Delete a course with touchable
  const removeGoalHandler = goalId => {
    //console.log('To be deleted: '  + goalId);
    //console.log(courseGoals);
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    })
  }
  //Cancel a new goal
  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  }

  return (
    //{} JavaScript Object
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)}/>
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAdditionHandler} />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value} />
        )} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },



});
