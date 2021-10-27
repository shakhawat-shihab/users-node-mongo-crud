import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(result => result.json())
            .then(data => setUsers(data));
    }, [])

    function handleDelete(id) {
        const proceed = window.confirm("are You Sure to delete?");
        if (proceed) {
            const url = `http://localhost:5000/users/${id}`;
            fetch(url, {
                method: 'delete'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert("Successfully deleted");
                        const remainingUsers = users.filter(x => x._id !== id);
                        setUsers(remainingUsers)
                    }
                })
        }
    }
    return (
        <div>
            <h2>Users Avialable {users.length}</h2>
            <ol>
                {users.map(x => {
                    return (
                        <li key={x._id} >
                            Name : {x.name} & Email: {x.email}
                            <NavLink to={`/users/update/${x._id}`}><button>Update</button></NavLink>
                            <button onClick={() => handleDelete(x._id)}>Delete</button>
                        </li>)
                }
                )}
            </ol>
        </div>
    );
};

export default Users;