import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';

export default function Chat() {

    const navigate = useNavigate();

    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(async () => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
        } else {
            setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        }
    }, []);

    useEffect(async () => {
        if (currentUser) {
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data.data);
        } else {
            navigate("/login");
        }
    }, [currentUser]);

    return (
        <>
            <div>
                <Contacts contacts={contacts} currentUser={currentUser} />
            </div>
        </>
    )
}
