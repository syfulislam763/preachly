import axios from "axios";
import { ROOT_URL, SIGNUP, VERYFY_EMAIL, RESEND_OTP, CREATE_PASS, LOGIN } from "../../context/APIs";
import Toast from "react-native-toast-message";


export const handleToast = (type, msg, goTo) => {
    Toast.show({
        type: type, 
        text1: type,
        text2: msg,
        visibilityTime: 1000,
        position: 'top',
        onHide: () => goTo()
    })
}


export const sign_up = async (payload, cb) => {
    try{
        const response = await axios.post(ROOT_URL+SIGNUP, payload)
        cb(response.data, true)
    }catch(error){
        cb(error, false)
    }
}

export const verify_email = async (payload, cb) => {
    try{
        const res = await axios.post(ROOT_URL+VERYFY_EMAIL, payload)
        const data = res.data
        cb(data, true)
    }catch(error){
        cb(error, false)
    }
}

export const resentOTP = async (payload, cb) => {
    try{
        const res = await axios.post(ROOT_URL+RESEND_OTP, payload)
        const data = res.data
        cb(data, true)
    }catch(error){
        cb(error, false)
    }
}

export const create_password = async (payload, cb) => {
    try{
        const res = await axios.post(ROOT_URL+CREATE_PASS, payload)
        const data = res.data
        cb(data, true)
    }catch(error){
        cb(error, false)
    }
}

export const login = async (payload, cb) => {
    try{
        const res = await axios.post(ROOT_URL+LOGIN, payload)
        const data = res.data
        cb(data, true)
    }catch(error){
        cb(error, false)
    }
}


