import React, { useEffect, useState } from "react";
import axios from "axios";
import './Styles.css';
import Update from "../update/Update";

const Header = () => {
    const [user, setUser] = useState('');
    const [image, setImage] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleForm = (condition) => {
        setShowForm(condition);
    }
    useEffect(() => {
        const getUserInformation = async () => {
            const headers = {
                "Content-Type": "application/json"
            };
            try {
                const url = `http://localhost:5000/api/profile/content?type=information`;
                const response = await axios.get(url, { headers });
                const [username, userImage] = response.data;
                setUser(username);
                setImage(userImage);
            } catch (error) {
                alert(error.message || "An error occurred");
            }
        };

        const intervalId = setInterval(() => {
            getUserInformation();
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
        {showForm && <Update show={handleForm}/>}
         <header className="header">
            <div className="logo-container">
                <img src="https://www.pngall.com/wp-content/uploads/4/Cyber-Security-Logo-PNG-Image.png" alt="Logo" className="logo" />
            </div>
            <p className="main-title">Security & Systems</p>
            <div className="user-info-container">
                <img src={image} alt="User" className="user-image" onClick={() => setShowForm(true)}/>
                <span className="user-name">{user}</span>
            </div>
        </header>
        </>       
    );
};

export default Header;
