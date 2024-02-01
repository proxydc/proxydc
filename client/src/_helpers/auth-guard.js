import router from '../routers'

const admin = 'admin';
const user = 'user';
export function authGuard(to){
    let token = localStorage.getItem('token')
    let useraccount = localStorage.getItem('useraccount')
    console.log(token)
    console.log(useraccount)

    if(token && useraccount == admin)
    {
        return true //admin
    }
    else if(token && useraccount == user)
    {
        return true //user
    }
    router.push('/')
}