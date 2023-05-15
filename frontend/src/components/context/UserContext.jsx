import { useState, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [refresh, setRefresh] = useState(false);
    const [userdata, setUserData] = useState({});
    const token = sessionStorage.getItem('usertoken');

    useEffect(() => {
        if (token) {
            fetch('http://26.133.54.94:8000/api/webshop/user', {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(userdata => {
                    if (!userdata.message) {
                        setUserData(userdata);
                    } else {
                        toast.error(userdata.message, { position: toast.POSITION.BOTTOM_RIGHT })
                    }
                })
                .catch(err => toast.error(err, { position: toast.POSITION.BOTTOM_RIGHT }));
        }
    }, [refresh]);

    const update = () => {
        setRefresh(prev => !prev);
    }

    const logout = () => {
        sessionStorage.removeItem('usertoken');
        update();
    }

    return <UserContext.Provider value={{ userdata, refresh, update, logout, token }}>{children}</UserContext.Provider>
}

export default UserContext