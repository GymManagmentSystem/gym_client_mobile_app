import {create} from 'zustand'

interface UserDataStore{
    loggedUserName:string,
    loggedMmeberId:number,
    setUserName:(name:string)=>void
    setLoggedMemberId:(id:number)=>void
}

const useUserDataStore=create<UserDataStore>(set=>({
    loggedUserName:"",
    loggedMmeberId:0,
    setUserName:(userName:string)=>set(()=>({loggedUserName:userName})),
    setLoggedMemberId:(userId:number)=>set(()=>({loggedMmeberId:userId}))
}))

export default useUserDataStore;