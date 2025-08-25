import axios from "axios";
import { ROOT_URL, SIGNUP, VERIFY_EMAIL, RESEND_OTP, CREATE_PASS, LOGIN, SOCIAL_LOGIN , PROFILE_UPDATE, VERIFY_CHANGE_EMAIL} from "../../context/Paths";
import Toast from "react-native-toast-message";
//Google sign in
// import {
//   GoogleSignin,
//   isErrorWithCode,
//   isSuccessResponse,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
import api from "../../context/api";

// GoogleSignin.configure({

//     webClientId:"311211597732-drk14eajg29l9rhld1hkr0g1m7dnr4p8.apps.googleusercontent.com",
//     scopes: ['profile', 'email'],
//     offlineAccess: true,
// });

// export const googleSignIn = async (cb) => {
//     try {
//         await GoogleSignin.hasPlayServices();
//         const response = await GoogleSignin.signIn();
//         if (isSuccessResponse(response)) {
//             cb(response.data, true)
//         } else {
//             cb(response.data, false)
//         }
//     } catch (error) {
//         cb(error, false)
//         if (isErrorWithCode(error)) {
//             switch (error.code) {
//                 case statusCodes.IN_PROGRESS:
//                 console.log(error.message, "a")
//                 break;
//                 case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
//                 console.log(error.message, "b")
//                 break;
//                 default:
//                 console.log(error, "c")
//                 console.log(error.code, error.message, error.name, error.cause)
//             }
//         } else {
//             console.log("something else")
//         }
//     }
// };

// export const googleSignOut = async (cb) => {
//     try {
//         await GoogleSignin.signOut();
//         cb(true)
//     } catch (error) {
//         cb(false)
//     }
// };


export const handleToast = (type, msg,duration=1000, goTo, show=()=>{}) => {
    Toast.show({
        type: type, 
        text1: type,
        text2: msg,
        visibilityTime: duration,
        position: 'top',
        onHide: () => goTo(),
        onShow: () => show()
    })
}


export const sign_up = async (payload, cb) => {
    try{
        const response = await api.post(SIGNUP, payload)
        cb(response.data, true)
    }catch(error){
        cb(error, false)
    }
}

export const verify_email = async (payload, cb) => {
    try{
        const res = await api.post(VERIFY_EMAIL, payload)
        const data = res.data
        cb(data, true)
    }catch(error){
        cb(error, false)
    }
}

export const resentOTP = async (payload, cb) => {
    try{
        const res = await api.post(RESEND_OTP, payload)
        const data = res.data
        cb(data, true)
    }catch(error){
        cb(error, false)
    }
}

export const create_password = async (payload, cb) => {
    try{
        const res = await api.post(CREATE_PASS, payload)
        const data = res.data
        cb(data, true)
    }catch(error){
        cb(error, false)
    }
}

export const login = async (payload, cb) => {
    try{
        const res = await api.post(LOGIN, payload)
        const data = res.data
        cb(data, true)
    }catch(error){
        cb(error, false)
    }
}
export const googleLogin = async (payload, cb) => {
    try{
        console.log("hey", ROOT_URL+SOCIAL_LOGIN)
        console.log(payload)
        const res = await api.post(SOCIAL_LOGIN, payload,{
            headers:{
                'Content-Type':'application/json',
                'X-CSRFTOKEN': 'L5lIgvX3eVyHzQ3Rp547wKsPR1KaeCMfFnk7kjy7YuV7Zf1y3n5BrKgB34oRagh4'
            }
        })
        const data = res.data
        cb(data, true)
    }catch(error){
        cb(error, false)
    }
}


export const get_profile_info = async(cb) => {
    // console.log("header ->", api.defaults.headers.common )
    try{
        const res = await api.get(PROFILE_UPDATE)
        cb(res.data, true)
    }catch(e){cb(e, false)}
}
export const update_profile_info = async(payload, cb) => {
    try{
        const res = await api.patch(PROFILE_UPDATE, payload, {
            headers:{
                Accept: '*/*',
                "Content-Type": 'multipart/form-data',
            }
        })
        cb(res.data, true)
    }catch(e){
        console.log(e.message, e)
        cb(e, false)
    }
}

export const verify_change_email = async(payload, cb) => {
    try{
        const res = await api.post(VERIFY_CHANGE_EMAIL, payload)
        cb(res.data, true)
    }catch(error){
        cb(error, false)
    }
}

export const get_payment_status = async (token, cb) => {
    const url = `/subscription/status/`;
    try{
        const res = await api.get(url,{
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        cb(res.data, true);
    }catch(e){
        cb(e, false);
    }
}


export const forget_password = async (payload, cb) => {
    const url = `/auth/password/reset-request/`
    try{
        const res = await api.post(url, payload);
        cb(res.data, true);
    }catch(e){
        cb(e, false);
    }
}

export const verify_forget_password = async (payload, cb) => {
    const url = `/auth/password/reset-verify-otp/`;
    try{
        const res = await api.post(url, payload);
        cb(res.data, true);
    }catch(e){
        cb(e, false);
    }

}

export const confirm_forget_password = async (payload, cb) => {
    const url = `/auth/password/reset-confirm/`;
    try{
        const res = await api.post(url, payload);
        cb(res.data, true);
    }catch(e){
        cb(e, false);
    }
}
