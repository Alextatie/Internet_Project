import { Text, FlatList, Button } from 'react-native';
import { FC, useState, useEffect } from "react";
import styles from '../../styles';
import PostListRow from './PostListRow';
import PostModel, { Post } from '../../models/PostModel';

const PostScreen: FC<{ navigation: any }> = ({ navigation }) => {

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('PostScreen')}
                    title="Post"
                />
            ),
        })
    }, [])
    const [data, setData] = useState<Post[]>([])
    const onItemSelected = (message: string, sender: string,id:string) => {
        console.log('Item selected: ' + id);
        navigation.navigate('Post', { message: message, sender: sender, id: id });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            try {
                const posts = await PostModel.getAllPosts("")
                setData(posts)
            } catch (err) {
                console.log(err)

            }
        })
        return unsubscribe
    }, [navigation])


    //useEffect(() => {
    //    navigation.setOptions({
    //        headerRight: () => (
    //            <Button
    //                onPress={() => navigation.navigate('Register')}
    //                title="Add"
    //            />
    //        ),
    //    })
    //}, [])

    return (
        <FlatList
            style={styles.flatlist}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <PostListRow
                    sender={item.sender}
                    message={item.message}
                    id={item.id }

                    onItemSelected={onItemSelected}
                />
            )}
        />
    )
}

export default PostScreen;