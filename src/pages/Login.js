import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import '../styles/Login.css';

import api from '../services/api'
import logo from '../assets/logo.svg';

export default function Login({ history }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    async function handleRegister(e) {
        history.push("/register");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!username || !password) {
            enqueueSnackbar('Preencha os campos.', {
                variant: 'warning'
            });
            return false;
        }
        const response = await api.post('/login', { username, password }).catch(error => {
            enqueueSnackbar('Falha ao efetuar login.', {
                variant: 'error'
            });
        });

        if (!response) {
            return;
        }
        const { token } = response.data;

        if (token) {
            localStorage.setItem('@comanda/token', token);
            history.push("/");
            window.location.reload();
            enqueueSnackbar('Login realizado com sucesso!', {
                variant: 'success'
            });
        } else {
            enqueueSnackbar('Falha ao efetuar login.', {
                variant: 'error'
            });
        }
    }

    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit}>
                <img src={logo} alt='Comanda +'></img>
                <input
                    placeholder="Usuário"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type='password'
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="btn-submit" type="submit">Entrar</button>
                <button className="btn-register" onClick={handleRegister}>Cadastrar</button>
            </form>
        </div>
    );
}