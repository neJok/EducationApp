import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useInitDataRaw} from "@tma.js/sdk-react";
import {set} from "@/lib/Features/User/userSlice";
import {useEffect} from "react";


export default function GetUser() {
    const dispatch = useAppDispatch()
    const initDataRaw = useInitDataRaw()

    useEffect(() => {
        if (initDataRaw) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/`, {
                headers: {
                    "X-Telegram-Init-Data": initDataRaw
                },
                method: "POST"
            }).then((res) => res.json().then((data) => dispatch(set(data))))
        }
    }, [dispatch, initDataRaw]);

    return null
}