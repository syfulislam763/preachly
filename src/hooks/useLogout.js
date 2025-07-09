import { View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../context/api";
import { handleToast } from "../screens/auth/AuthAPI";
import { useEffect } from "react";
import { get_profile_info } from "../screens/auth/AuthAPI";

const useLogout = () => {
    const {logout} = useAuth()

    const login_again = () => {
        get_profile_info((res,success) => {
            if(!success && res.response.status === 401){
                handleToast("error", "Session expired. Please login again.", 2000, () => {
                    logoutUser(() => {
                    logout();
                    }, () => {
                        
                    });
                });
            }
        })
        
    }

    useEffect(() => {
        login_again()
    }, [])


}


export default useLogout