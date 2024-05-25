import { Text, FlatList, Button } from 'react-native';
import { FC, useState, useEffect } from "react";
import styles from '../../styles';
import PostListRow from './PostListRow';
import PostModel, { Post } from '../../models/PostModel';
import StudentModel, { Student } from '../../models/StudentModel';
import ActivityIndicator from '../Lottie';

const PostScreen: FC<{ navigation: any }> = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
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
    const onItemSelected = (id:string,message: string, sender: string, sender_avatar: string,type:string) => {
        navigation.navigate('Post', { id: id,message: message, sender: sender, sender_avatar: sender_avatar,type:type });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            try {
                setLoading(true)
                const posts = await PostModel.getAllPosts("")
                setData(posts)
                setLoading(false)
            } catch (err) {
                setLoading(false)
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
        loading ?
            <ActivityIndicator visible={true} />
            :
        <FlatList
            style={styles.flatlist}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <PostListRow
                    id={item.id}
                    message={item.message}
                    sender={item.senderName}
                    sender_avatar={item.sender_avatar}
                    type={item.type}

                    onItemSelected={onItemSelected}
                />
            )}
        />
    )
}

export default PostScreen;