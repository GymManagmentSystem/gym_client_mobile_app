import {create} from 'zustand'

interface UserDataStore{
    loggedUserName:string,
    loggedMmeberId:number,
    isFirstUserLogin:boolean,
    setUserName:(name:string)=>void
    setLoggedMemberId:(id:number)=>void
    setFirstUserLogin:(status:boolean)=>void
}

const useUserDataStore=create<UserDataStore>(set=>({
    loggedUserName:"",
    loggedMmeberId:0,
    isFirstUserLogin:false,
    setUserName:(userName:string)=>set(()=>({loggedUserName:userName})),
    setLoggedMemberId:(userId:number)=>set(()=>({loggedMmeberId:userId})),
    setFirstUserLogin:(status:boolean)=>set(()=>({isFirstUserLogin:status}))
}))

export default useUserDataStore;