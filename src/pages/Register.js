import React, { useState } from 'react';
import '../styles/Register.css';

import api from '../services/api'
import logo from '../assets/logo.svg';

export default function Register({history}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/user', {name, username, password});

        const { _id } = response.data;

        if (_id){
            history.push('/');
        }
    }

    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit}>
                <img src={logo} alt='Comanda+'></img>
                <input 
                    placeholder="Nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input 
                    placeholder="Usuário"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="btn-submit" type="submit">Cadastrar</button>
            </form>
        </div>
    );
}