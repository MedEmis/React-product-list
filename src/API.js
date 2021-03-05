// import * as axios from "axios"
import dataBase from './db.json'


// const URL_storage = {
// 	firebase: "",
// 	jsonPlaceholderRemote: "https://my-json-server.typicode.com/MedEmis/small_projects_collections/",
// 	jsonPlaceholderLocal: "http://localhost:4000/"
// }

// const axiosInstance = axios.create({
// 	baseURL: URL_storage.jsonPlaceholderRemote,
// 	headers: { "Content-Type": "application/json" }
// })

// const axiosDBlocalhost = axios.create({
// 	baseURL: URL_storage.jsonPlaceholderLocal,
// 	headers: { "Content-Type": "application/json" }
// })

// const URL_path = {
// 	posts: `posts`,
// 	comments: `comments`,
// 	todos: `todos`
// }

// export const API = {
// 	getPosts: async () => await axiosInstance.get(URL_path.posts).then(res => res),
// 	getComments: async () => await axiosInstance.get(URL_path.comments).then(res => res),
// 	getToDos: async () => await axiosInstance.get(URL_path.todos).then(res => res),
// 	setToDos: async (time, date, event) => await axiosInstance.post(URL_path.todos, { time, date, event }).then(res => res),
// 	deleteToDos: async (id) => await axiosInstance.delete(`${URL_path.todos}/${id}`).then(res => res),
// }



export const readJson = () => {

	return dataBase
}

