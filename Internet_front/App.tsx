//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity, Button } from 'react-native';
import React, { useState,FC } from 'react';
import StudentAddPage from './Components/StudentAddPage';
import StudentList from './Components/StudentList';
import StudentProfile from './Components/StudentProfile';
import HomeScreen from './Components/HomeScreen';
import styles from './styles';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {     
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ title: 'Home' }}>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Student List" component={StudentList} options={{ title: 'Students List' }} />
                <Stack.Screen name="Add Student" component={StudentAddPage} options={{ title: 'Add New Student' }} />
                <Stack.Screen name="Student Profile" component={StudentProfile} options={{ title: 'Student Profile' }} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}
