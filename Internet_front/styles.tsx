import { StyleSheet} from 'react-native';
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "white",
            marginTop: 22,
        },
        listrow: {
            flexDirection: "row",
            backgroundColor: "white",
            borderWidth: 1,
            borderRadius: 10,
            marginHorizontal: 5,
            marginVertical: 1,
            borderColor: "gray",
            
        },
        info: {
            flexDirection: "column",
            justifyContent: "center",
            marginTop: 6
        },
        avatar: {
            height: 65,
            width: 65,
            margin: 5
        },
        name: {
            fontSize: 20,
            fontWeight: "bold",
            marginVertical: 0
        },
        id: {
            fontSize: 15,
            marginBottom: 10
        },
        textInput: {
            fontSize: 20
        },
        flatlist: {
            flex: 1
        },
        image: {
            alignSelf: "auto",
            //height: 200,
            //width: 200,

        },
    });

export default styles
