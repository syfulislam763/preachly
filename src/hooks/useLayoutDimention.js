import { useEffect, useState } from "react";
import { Dimensions } from "react-native";


export default function useLayoutDimention () {
    const [windowInfo, setWindowInfo] = useState(Dimensions.get('window'))
    useEffect(()=>{
        const onChange = (result) => {
            setWindowInfo(result.window)
        }

        const event = Dimensions.addEventListener('change',  onChange);


        return () => event.remove()

    }, [])


    return {
        ...windowInfo,
        isSmall: (windowInfo.width>320 && windowInfo.width<400),
        isMedium: (windowInfo.width >= 400 && windowInfo.width<500),
        isLarge: (windowInfo.width>=500)
    }
}

