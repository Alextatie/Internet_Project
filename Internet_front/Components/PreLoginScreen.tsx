import { StatusBar,StyleSheet,Text, FlatList, View, Button, Image } from 'react-native';
import { FC, useState, useEffect } from "react";
import StudentListRow from './StudentListRow';
import StudentModel, { Student } from '../models/StudentModel';

const PreLoginScreen: FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <View style={{
            flex: 1, alignItems: 'center', justifyContent: 'center'
        }}>
            <View>
                <Text style={styles.title}>{"Welcome to"}</Text>
                <Text style={styles.title}>{"Student app"}</Text>
            </View>
            <Button
                title="Login"
                onPress={() => navigation.navigate("Login")}
            />
            <Button
                title="Register"
                onPress={() => navigation.navigate("Register")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        flexDirection: 'column',
        marginBottom: 280,
        marginHorizontal: 20

    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: 'blue',
    },
    input1: {
        fontSize: 16,
        fontWeight: "bold"
    },
    input2: {
        fontWeight: "bold",
        color: "grey"
    }
});
export default PreLoginScreen;