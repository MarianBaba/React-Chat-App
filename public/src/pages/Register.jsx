import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

function Register() {

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { password, confirmPassword, username, email } = values;
        const { data } = await axios.post(registerRoute, {
            username, email, password
        }).then(() => {
            console.log("done");
        })
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
                <input type="email" placeholder='email' name='email' onChange={e => handleChange(e)} />
                <input type="password" placeholder='password' name='password' onChange={e => handleChange(e)} />
                <input type="password" placeholder='confirm password' name='confirmPassword' onChange={e => handleChange(e)} />

                <button type="submit">Create User</button>
                <span>already have an acc? <Link to="/login">Login</Link></span>
            </form>
        </>
    )
}

export default Register;