import axios from 'axios'
import { baseUrl } from '../config'



const register = async (username: string, password: string, email: string)=>{

    let body = {
        username,
        password,
        email
    }
    try{
        let req = await axios.post(`${baseUrl}/auth/register`, body)
        return req
    }
    catch(err){
        throw err
    }

}
export default register;