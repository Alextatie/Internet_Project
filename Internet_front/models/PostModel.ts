import UserApi from "../api/UserApi"
import StudentModel, { Student, Editable } from '../models/StudentModel';

export type Post = {
    id: string,
    message: string,
    sender: string,
    senderName: string,
    sender_avatar: string,
    type: string
}

//let data = Array<Post>()

const getAllPosts = async (id: string) => {
    let res: any = await UserApi.getAllPosts(id)
    console.log(res.status)
    if (res.status == 403) {
        await StudentModel.refresh()
        res = await UserApi.getAllPosts(id)
    }
    let data = Array<Post>()
    if (res.data) {
        res.data.forEach((obj: any) => {
            const st: Post = {
                id: obj._id,
                message: obj.message,
                sender: obj.sender,
                senderName: obj.senderName,
                sender_avatar: obj.sender_avatar,
                type: obj.type
            }
            data.push(st)
        });
    }
    console.log(data.length + " posts loaded")
    return data
}
const postPost = async (msg:string,type:string) => {
    try {
        await StudentModel.refresh()
        console.log("Posting post")
        const data = {
            message: msg,
            sender: StudentModel.getCurrent().id,
            senderName: StudentModel.getCurrent().name,
            sender_avatar: StudentModel.getCurrent().avatar_url,
            type: type
        }
        if ((StudentModel.getCurrent().avatar_url == "") || (StudentModel.getCurrent().avatar_url == undefined)) {
            data.sender_avatar="x"
        }
        await UserApi.postPost(data)
    } catch (err) {
        console.log(err)
    }
}

const editPost = async (id:string,msg: string,type:string) => {
    try {
        await StudentModel.refresh()
        const data = {
            message: msg,
            type: type
        }
        return await UserApi.editPost(id, data)
    } catch (err) {
    console.log(err)
}
}

const deletePost = async (id: string) => {
    try {
        await StudentModel.refresh()
        return await UserApi.deletePost(id)
    } catch (err) {
    console.log(err)
}
}

export default { getAllPosts, postPost,editPost,deletePost};