import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [userStatusInfo, setUserStatusInfo] = useState(null);

    const isUser = async() => {
        const token = localStorage.getItem('token');
        const formData = { page: 'isUser' };
        if (token) {
                const response = await fetch('http://127.0.0.1/ReactApi-/traitement.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                    body: JSON.stringify(formData),
                });
                const dataResponse = await response.json();
                setUserStatusInfo(dataResponse);
        } else {
            setUserStatusInfo(false);
        }
    }
    useEffect( () => {
            isUser();
    }
    , []);

    return (
        <AuthContext.Provider value={{ userStatusInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé à l\'intérieur de AuthProvider');
    }
    return context;
}





