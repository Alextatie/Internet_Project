import { TouchableOpacity,Text, View,Image } from 'react-native';
import { FC} from "react";
import styles from '../styles';

const PreLoginScreen: FC<{ navigation: any }> = ({ navigation }) => {
    const onLogin = async () => {
        console.log("To-Login")
        navigation.navigate('Login');
    }
    const onRegister = async () => {
        console.log("To-Register")
        navigation.navigate('Register');
    }
    const onGoogle = async () => {
        console.log("To-Google")
        //navigation.navigate('Register');
    }
    return (
        <View style={{
            flex: 1, alignItems: 'center', justifyContent: 'center'
        }}>
            <View>
                <Image source={require('../assets/PreLogin.png')}  />
            </View>
            <View>
                <Text style={styles.title}>{"Student App"}</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={onLogin}>
                <Text style={styles.buttonText1}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={onRegister}>
                <Text style={styles.buttonText2}>REGISTER</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={onGoogle}>
                <Text style={styles.buttonText2}>Google</Text>
            </TouchableOpacity>
        </View>
    );
}

export default PreLoginScreen;