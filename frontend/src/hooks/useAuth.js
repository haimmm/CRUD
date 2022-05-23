import { useEffect, useState } from "react";

export const useAuth = () => {

    const [user, setUser] = useState(null);

    const logOut = () => {
        setUser(null);
    }

    return {
        user,
        setUser,
        logOut
    }
}