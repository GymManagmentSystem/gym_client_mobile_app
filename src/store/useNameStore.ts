import {create} from 'zustand'

interface UserNameStore{
    loggedUserName:string,
    setUserName:(name:string)=>void
}

const useUserNameStore=create<UserNameStore>(set=>({
    loggedUserName:"",
    setUserName:(userName:string)=>set(()=>({loggedUserName:userName}))
}))

export default useUserNameStore;