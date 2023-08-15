import axios from 'axios'
import { baseUrl } from '../config'

interface response{
    data:{
        token:string;
        username:string;
        role:string;
    };
    
}

const check = async (token: string)=>{

    try{
        let req = await axios.get<any, response>(`${baseUrl}/auth/`, {headers: {
            Authorization: `Bearer ${token}`
        }})
        return req.data
    }
    catch(err){
        throw err
    }

}
export default check;