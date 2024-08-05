import {EMAIL_REGEX} from '../constants.js'
export const validate = (formData)=>{
    const newFormError = {};
    if(!formData.userName){
        newFormError.userName = 'User name is required'
    }
    if(!formData.email){
        newFormError.email = 'Email is required'
    }else if(!EMAIL_REGEX.test(formData.email)){
        newFormError.email = 'Email address is not valid'
    }
    if(!formData.password){
        newFormError.password = 'Password is required'
    }else if(formData.password.length < 6){
        newFormError.password = 'Password should be at least 6 characters long'
    }
    return newFormError
}   
