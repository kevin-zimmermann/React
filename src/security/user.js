import {useState, useEffect} from 'react';

export const AuthProvider = () => {
    const [userStatus, setUserStatus] = useState(null); // Initialize user status to null

    const isUser = async () => {
        const token = localStorage.getItem('token');
        const formData = {page: 'isUser'};

        if (token) {
            try {
                const response = await fetch('http://127.0.0.1/howToVerify/traitement.php', {
                    method: 'POST', headers: {
                        'Content-Type': 'application/json', Authorization: token,
                    }, body: JSON.stringify(formData),
                });

                const dataResponse = await response.json();
                console.log(dataResponse)
                // Update the userStatus state with the received data
                setUserStatus(dataResponse);
            } catch (err) {
                console.log(err);
            }
        } else {
            return false;
        }

    }
    useEffect(() => {
        // Call the isUser function when the component mounts
        const fetchUserData = async () => {
            const user = await isUser();
            console.log(user)

            // No need to return dataResponse, setUserStatus already sets the state
        };
        fetchUserData();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    console.log(userStatus);
    return userStatus; // This will be returned by the component, but you may not need it depending on your use case.
};
