import { jwtDecode } from "jwt-decode";
import { loginRequest } from '../js/externalServices.mjs'
import { alertMessage, getLocalStorage, setLocalStorage} from './utils.mjs'
const tokenKey = 'so-token';

export async function login(creds, redirect = "/"){
    try{
        const token = await loginRequest(creds)
        setLocalStorage(tokenKey, token);
        checkLogin()
        window.location = redirect;
        return token;
    } catch (err){
        alertMessage(err.message)
    }
}

function checkLogin(){
    const token = getLocalStorage(tokenKey);

    if(!isTokenValid(token)){
        localStorage.removeItem(tokenKey)
        window.location = `/login/?redirect=${window.location.pathname}`
        return
    }
    return token;
}

function isTokenValid(token){
    const decodedToken = jwtDecode(token.accessToken)
    const currentTime = Date.now()/1000;
    if(decodedToken.exp < currentTime){
        console.log('Token Is Expired')
        return false;
    }
    return true
}