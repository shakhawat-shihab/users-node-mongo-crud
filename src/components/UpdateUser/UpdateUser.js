import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

const UpdateUser = () => {
    const history = useHistory();
    const { id } = useParams();
    const [user, setUser] = useState({ name: '', email: '' });
    useEffect(() => {
        fetch(`http://localhost:5000/users/${id}`)
            .then(result => result.json())
            .then(data => setUser(data));
    }, []);
    const handleUpdateUser = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'put',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert("Succesfully updated!");
                    setUser({ name: '', email: '' });
                    history.push('/users');
                }
            });
    }
    function handleNameChange(e) {
        const updateName = e.target.value;
        const updateUser = { name: updateName, email: user.email };
        setUser(updateUser);
    }
    function handleEmailChange(e) {
        const updateEmail = e.target.value;
        const updateUser = { ...user };
        updateUser.email = updateEmail;
        setUser(updateUser);
    }
    return (
        <div>
            <h2>  Update {user.name} </h2>
            <form onSubmit={handleUpdateUser}>
                <input type="text" onChange={handleNameChange} value={user?.name} />
                <input type="email" onChange={handleEmailChange} value={user?.email} />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateUser;