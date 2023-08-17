import { userDataType } from "../feature/userSlice";

export const addUserToLocalStorage = (user:userDataType)=>{
    localStorage.setItem('user', JSON.stringify(user));
}


export const authenticateUser = (value:boolean)=>{
    localStorage.setItem('auth', JSON.stringify(value))
}
export const getAuthenticateuser = ()=>{
    const result = localStorage.getItem('auth')
    const user = result ? JSON.parse(result): null;
    return user
}

export const getUserFromLocalStorage = ()=>{
    const result = localStorage.getItem('user')
    const user:userDataType = result ? JSON.parse(result): null;
    return user
}
