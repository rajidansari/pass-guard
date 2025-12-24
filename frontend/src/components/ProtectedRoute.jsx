import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContextProvider";
import axios from "axios";
import { BASE_URI } from "../config";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { user, setUser } = useAuth();

    useEffect(() => {
        if (user === null) {
            navigate("/login");
            return;
        } else {
            axios.get(`${BASE_URI}/user/profile`, {
                    withCredentials: true,
                })
                .then((res) => {
                    if (res.status !== 200) {
                        setUser(null);
                        localStorage.removeItem("user");
                        navigate("/login");
                        return;
                    }
                })
                .catch((err) => {
                    console.error(`unauthorized error ${err}`);
                    setUser(null);
                    localStorage.removeItem("user");
                    navigate("/login");
                })
                .finally(() => {
                    setLoading(false);
                })
               
        }
    }, [navigate]);

    if (loading)
        return (
            <div className="h-10 w-10 rounded-full border-accent border-t-white border-2 animate-spin absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"></div>
        );
    return <main>{children}</main>;
};

export default ProtectedRoute;
