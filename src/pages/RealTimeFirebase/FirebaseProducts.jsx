import React, { useEffect, useState } from 'react';
import { database } from './firebase';
import { ref, set, push, onValue, get, update, remove } from 'firebase/database';


const FirebaseProducts = () => {
    const [input, setInput] = useState({})
    const [users, setUser] = useState()
    const [id, setId] = useState()
    const [edit, isEdit] = useState(false)
    console.log(input)
    useEffect(() => {
        const userRef = ref(database, 'users');
        onValue(userRef, (snapshot) => {
            var list = []
            snapshot.forEach((childSnapshot) => {
                var id = childSnapshot.key
                var data = childSnapshot.val()
                var detail = { id, ...data }
                list.push(detail)
            })
            setUser(list)
        })

    }, [])
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (edit) {
            const userRef = ref(database, `users/${id}`);
            update(userRef, input).then(() => {
                console.log('Updated.....')
                setInput(null)
                isEdit(false)
            })
        } else {
            const userRef = ref(database, 'users');
            const newUser = push(userRef)
            set(newUser, input)
        }
    }

    const handleEdit = (id) => {
        const userRef = ref(database, `users/${id}`);
        get(userRef).then((user) => {
            var userData = user.val()
            setInput(userData)
            setId(id)
            isEdit(true)
        })
    }

    const handleDelete = (id) => {
        const userRef = ref(database, `users/${id}`);
        remove(userRef).then(() => {
            console.log('Delete...')
        })
    }

    return (
        <div className="container">
            <div className=" justify-content-center">
                <div className="col-4">
                    <h1>User Form</h1>
                    <form action="" onSubmit={handleSubmit}>
                        <label>Name</label><br />
                        <input type="text" name="name" id="floatingInput" placeholder=" Enter your name" onChange={handleChange} value={input ? input.name : ''} />
                        <br />
                        <br />
                        <label>Email</label><br />
                        <input type="email" name="email" id="" placeholder='Enter Your Email' onChange={handleChange} value={input ? input.email : ''} />
                        <br />
                        <br />
                        <label>Password</label><br />
                        <input type="password" name="password" id="" placeholder='Enter Your Password' onChange={handleChange} value={input ? input.password : ''} />
                        <br />
                        <button className="btn btn-outline-success mt-3">{edit ? 'UPDATE' : 'SUBMIT'}</button>
                    </form>
                </div>
                <div className="col-8 mt-5">
                    <h1>User Data</h1>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user) =>
                                    <tr>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button className="btn btn-outline-warning me-3" onClick={() => handleEdit(user.id)}>EDIT</button>
                                            <button className="btn btn-outline-danger" onClick={() => handleDelete(user.id)}>DELETE</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}

export default FirebaseProducts;
