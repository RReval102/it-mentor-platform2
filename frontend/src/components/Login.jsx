import React, { useState } from 'react';
import { DB } from '../mockDB';

function Login({ onLogin }) {
  const [email, setEmail] = useState('student');
  const [password, setPassword] = useState('123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = DB.users.find(u => u.login === email && u.password === password);
    if (user) {
      setError('');
      onLogin(user);
    } else {
      setError('Неверный логин или пароль!');
    }
  };

  return (
    <section id="view-login" className="view active">
      <div className="login-card">
        <h2>Вход в платформу</h2>
        <p>Используйте тестовые данные:<br /><br />
          Студент: <b>student</b> / пароль: <b>123</b><br />
          Ментор: <b>mentor</b> / пароль: <b>123</b>
        </p>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Логин (email)</label>
            <input 
              type="text" 
              id="loginEmail" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input 
              type="password" 
              id="loginPassword" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          <p className="error-msg" id="loginError">{error}</p>
          <button type="submit" className="btn primary full-width">Войти</button>
        </form>
      </div>
    </section>
  );
}

export default Login;
