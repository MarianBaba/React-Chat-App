import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

function Login() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate("/");
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { password, username } = values;
        const { data } = await axios.post(loginRoute, {
            username, password
        });
        if (data.status === true) {
            localStorage.setItem("chat-app-user", JSON.stringify(data.user));
            navigate("/");
        }
    }

    // const handleValidation = () => {
    //     const { password, confirmPassowrd, username, email } = values;
    //     if (password !== confirmPassowrd) {
    //         alert("password non è uguale a confirm password");
    //     }
    // }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        console.log(values);
    }

    return (
        <>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div>
                    <img src="" alt="">
                    </img>
                    <h1>Snappy</h1>
                </div>
                <input type="text" placeholder='username' name='username' onChange={e => handleChange(e)} />
                <input type="password" placeholder='password' name='password' onChange={e => handleChange(e)} />

                <button type="submit">login</button>
                <span>dont have an acc? <Link to="/register">Register</Link></span>
            </form>
        </>
    )
}

export default Login;
