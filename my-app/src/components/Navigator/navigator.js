import './navigator.scss';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Navigation = () => {


    const userName = localStorage.getItem('nombre');
    const navigate = useNavigate();
    const [comment, setComment] = useState('');

    const exit = () => {
        navigate('/');
    }

    const home = () => {
        navigate('/home');
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
        console.log('entro')
    };

    return (
        <div className='navigation'>
            <div className='hero-image'>
                <div className='hero-text'>
                    <h1>¡Welcome!</h1>
                    <p>{userName}</p>
                </div>
            </div>
            <nav className='bnav'>
                <ul>
                    <li><button id='home' onClick={home} >Home</button></li>
                    <li><input className='input-nav' value={comment} onChange={handleCommentChange} onClick={() => {
                        setComment('')
                    }}//LIMPIAR CAMPO
                        type='text' name='Buscador' id='Buscador' placeholder='Buscar' ></input></li>
                </ul>
                <button id='signoff' onClick={exit} >Sign off</button>
            </nav>
        </div >
    )
}

export default Navigation;