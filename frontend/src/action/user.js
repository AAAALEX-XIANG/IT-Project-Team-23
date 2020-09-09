import {loginRequest} from '../request'
import actionType from './actionType'

const startLogin = () =>{
    return{
        type: actionType.START_LOGIN
    }
}

const loginSuccess = () =>{
    return{
        type: actionType.LOGIN_SUCCESS
    }
}

const loginFailed = () =>{
    return{
        type: actionType.LOGIN_FAILED
    }
}

export const login = (userInfo) =>{
    return dispatch => {
        dispatch(startLogin())
        loginRequest(userInfo)
            .then(resp => {
                console.log(resp)
            })

    }
}