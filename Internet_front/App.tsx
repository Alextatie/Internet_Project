//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity, Button } from 'react-native';
import React, { useState,FC } from 'react';
import RegisterScreen from './Components/RegisterScreen';
import StudentList from './Components/StudentList';
import StudentProfile from './Components/StudentProfile';
import EditableProfile from './Components/EditableProfile';
import ForumScreen from './Components/post/ForumScreen';
import PostScreen from './Components/post/PostScreen';
import HomeScreen from './Components/HomeScreen';
import LoginScreen from './Components/LoginScreen';
import PreLoginScreen from './Components/PreLoginScreen';
import NameEdit from './Components/edit/NameEdit';
import EmailEdit from './Components/edit/EmailEdit';
import PasswordEdit from './Components/edit/PasswordEdit';
import DeleteUser from './Components/edit/DeleteUser';
import UserPosts from './Components/post/UserPosts';
import Post from './Components/post/Post';
import EditablePost from './Components/post/EditablePost';
import EditedPost from './Components/post/EditedPost';
//import NameEdit from './Components/edit/NameEdit';
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
                <Stack.Screen name="NameEdit" component={NameEdit} options={{ title: 'Edit Name' }} />
                <Stack.Screen name="EmailEdit" component={EmailEdit} options={{ title: 'Edit Email' }} />
                <Stack.Screen name="PasswordEdit" component={PasswordEdit} options={{ title: 'Edit Password' }} />
                <Stack.Screen name="StudentProfile" component={StudentProfile} options={{ title: 'Profile' }} />
                <Stack.Screen name="EditableProfile" component={EditableProfile} options={{ title: 'Profile' }} />
                <Stack.Screen name="ForumScreen" component={ForumScreen} options={{ title: 'Forum' }} />
                <Stack.Screen name="PostScreen" component={PostScreen} options={{ title: 'Post' }} />
                <Stack.Screen name="DeleteUser" component={DeleteUser} options={{ title: 'Delete User' }} />
                <Stack.Screen name="UserPosts" component={UserPosts} options={{ title: 'User Posts' }} />
                <Stack.Screen name="Post" component={Post} options={{ title: 'Post' }} />
                <Stack.Screen name="EditablePost" component={EditablePost} options={{ title: 'Editable Post' }} />
                <Stack.Screen name="EditedPost" component={EditedPost} options={{ title: 'Edited Post' }} />

            </Stack.Navigator>
        </NavigationContainer>

    );
}
