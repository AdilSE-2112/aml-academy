import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
// import logo from '../../assets/images/logo.svg';
import Button from '../../components/UI/button/Button';
import axios from 'axios';

import backgroundVideo from '../../assets/video/bg.mp4'
import logo from '../../assets/images/logo.svg'
import switcher from '../../assets/icons/Switcher.svg'

import './login.scss'
import sfm_types from './../../components/data/sfm_types';

const Registration = () => {
    const [formData, setFormData] = useState({
        email: '', 
        password: '', 
    });

    useEffect(() => {
        
    }, [formData])

    const [errorMessage,
        setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e, name) => {
        e.preventDefault();
        setFormData({...formData, [name]: e.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('http://localhost:8080/api/aml/auth/authenticate', 
            {
                "email": formData['email'],
                "password": formData['password'],
            }
        )
            .then(res => {
                localStorage.setItem('jwtToken', res.data.body.token);

                console.log(res.data)
                navigate('/');
            })
            .catch(error => {
                // console.error('Registration failed:', error);
                if (error.response) {
                    setErrorMessage(error.response.data.error)
                    // console.log('Server Error:', error.response.data);
                } else if (error.request) {
                    setErrorMessage(error.request.error)
                    // console.log('Request Error:', error.request);
                } else {
                    setErrorMessage(error.message.error)
                    // console.log('Error:', error.message);
                }
            })
    };
      

    return (
        <div className='login-page'>
            <div className='backgroundVideo'>
                <video autoPlay loop muted className='bg-video'>
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
            </div>
            <div className='form-container'>

                <img className='logo' src={logo} alt="academy logo"/>
                <h1>Добро пожаловать!</h1>

                <div className="form-body">
                    <div className='fields'>
                        <Field 
                            formData={formData} 
                            handleChange={handleChange} 
                            name={'email'} 
                            label={'Почта'} 
                            hint={'Введите почту'}
                            />
                        <Field 
                            formData={formData} 
                            handleChange={handleChange} 
                            name={'password'} 
                            label={'Пароль'} 
                            hint={'Введите пароль'}
                            />
                    </div>
                    <div className='actions'>
                        <div className='remember-me'>
                            <div>
                                <div><img src={switcher} alt="" /></div>
                                <div>Запомнить меня</div>
                            </div>
                            <div className='forgot-password'>
                                Забыли пароль?
                            </div>
                        </div>
                        <div className='reg-btn' onClick={handleSubmit}>Логин</div>
                        <div className='have-account'>У вас нет аккаунта? <Link to={'/registration'}><span>Зарегистрируйтесь</span></Link></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Field = ({ name, label, hint, isPassword, isSelect, selectItems, formData, handleChange }) => {
    if (isSelect) {
      return (
        <div className='field'>
        <label htmlFor={name}>{label}</label>
            <div className="custom-select">
                <select id={name} value={formData[name]} onChange={(e) => handleChange(e, name)}>
                {selectItems.map(item => (
                    <option key={item} value={item}>{item}</option>
                ))}
                </select>
                <div className="dropdown-icon" onClick={() => {
                    document.getElementById(name).click();
                }}></div>
            </div>
        </div>

      )
    } else {
      return (
        <div className='field'>
          <label htmlFor={name}>{label}</label>
          <input
            placeholder={hint}
            value={formData[name]}
            type={isPassword ? 'password' : 'text'}
            name={name}
            onChange={(e) => handleChange(e, name)}
          />
        </div>
      )
    }
  }

export default Registration;
