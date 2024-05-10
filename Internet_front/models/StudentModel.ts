export type Student = {
    name: string,
    id: string,
    imgUrl: string
}

const data: Student[] = [
    {
        name: "Alex Tatievsky",
        id: "123456",
        imgUrl: "../assets/thumbs-up-cat.gif"
    },
    {
        name: "Bob Cohen",
        id: "123457",
        imgUrl: "../assets/thumbs-up-cat.gif"
    },
    {
        name: "Abram Levi",
        id: "123458",
        imgUrl: "../assets/thumbs-up-cat.gif"
    },
    {
        name: "Sam Bobby",
        id: "123459",
        imgUrl: "../assets/thumbs-up-cat.gif"
    },
    {
        name: "Bill Button",
        id: "123450",
        imgUrl: "../assets/thumbs-up-cat.gif"
    },
]

const getAllStudents = (): Student[] => {
    return data;
}

const exists = (id: string) => {
    const index = data.findIndex((student) => student.id === id);
    if (index !== null) {
        return true
    }
    else {
        return false
    }
}

const getStudent = (id: string): Student | undefined => {
    return data.find((student) => student.id == id);
}

const addStudent = (student: Student) => {
    data.push(student);
}

const deleteStudent = (id: string) => {
    const index = data.findIndex((student) => student.id === id);
    if (index !== -1) {
        data.splice(index, 1);
    }
}

export default { getAllStudents, getStudent, addStudent, deleteStudent,exists };