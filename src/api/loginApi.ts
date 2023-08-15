import axios from 'axios'
import { baseUrl } from '../config'



const login = async (username: string, password: string)=>{

    let body = {
        username,
        password
    }
    try{
        let req = await axios.post(`${baseUrl}/auth/login`, body)
        return req
    }
    catch(err){
        throw err
    }

}
export default login;