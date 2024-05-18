//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity, Button } from 'react-native';
import React, { useState,FC } from 'react';
import RegisterScreen from './Components/RegisterScreen';
import StudentList from './Components/StudentList';
import StudentProfile from './Components/StudentProfile';
import ForumScreen from './Components/ForumScreen';
import PostScreen from './Components/PostScreen';
import HomeScreen from './Components/HomeScreen';
import LoginScreen from './Components/LoginScreen';
import PreLoginScreen from './Components/PreLoginScreen';
import StudentEdit from './Components/StudentEdit';
import styles from './styles';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();RegisterScreen

export default function App() {     
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ title: 'Home' }}>
                <Stack.Screen name="PreLogin" component={PreLoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
                <Stack.Screen name="StudentList" component={StudentList} options={{ title: 'Students List' }} />
                <Stack.Screen name="StudentEdit" component={StudentEdit} options={{ title: 'Students Edit' }} />
                <Stack.Screen name="StudentProfile" component={StudentProfile} options={{ title: 'Student Profile' }} />
                <Stack.Screen name="ForumScreen" component={ForumScreen} options={{ title: 'Forum Screen' }} />
                <Stack.Screen name="PostScreen" component={PostScreen} options={{ title: 'Post Screen' }} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}
