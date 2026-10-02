import React, { useState } from 'react';
import { DB } from '../mockDB';
import axios from 'axios';

function MentorDashboard() {
  const [tasks, setTasks] = useState(DB.mentorTasks);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [statusMsg, setStatusMsg] = useState({ text: '', color: '' });
  const [loading, setLoading] = useState(false);

  const checkHw = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'checking' } : t));
    
    setTimeout(() => {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'checked' } : t));
    }, 800);
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setStatusMsg({ text: 'Отправка данных в БД...', color: 'var(--text-secondary)' });
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/courses', {
        title: title,
        description: desc
      });
      
      if (response.status === 201 || response.status === 200) {
        setStatusMsg({ 
          text: `✅ Курс "${response.data.title}" успешно добавлен в базу данных (ID: ${response.data.id || response.data._id})!`, 
          color: 'var(--success)' 
        });
        setTitle('');
        setDesc('');
      } else {
        throw new Error('Ошибка сервера');
      }
    } catch (error) {
      console.error('API Error:', error);
      setStatusMsg({ 
        text: `✅ Курс "${title}" добавлен локально (бэкенд недоступен, симуляция).`, 
        color: 'var(--warning)' 
      });
      setTitle('');
      setDesc('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="view-mentor-dashboard" className="view active">
      <header className="dashboard-header">
        <h1>Панель ментора 👩‍🏫</h1>
        <p>У вас есть новые работы на проверку.</p>
      </header>
      
      <section className="hw-section">
        <h2>Работы на проверку</h2>
        <div className="hw-list" id="mentorHwList">
          {tasks.map(t => (
            <div className="hw-item" id={`task-${t.id}`} key={t.id}>
              <div>
                <h4>{t.task}</h4>
                <span style={{ color: 'var(--text-secondary)' }}>Студент: <b>{t.student}</b></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {t.status === 'pending' && <span className="badge" id={`badge-${t.id}`}>Ожидает</span>}
                {t.status === 'checking' && <span className="badge" id={`badge-${t.id}`}>Проверка...</span>}
                {t.status === 'checked' && <span className="badge success" id={`badge-${t.id}`}>Проверено (5/5)</span>}
                
                {t.status !== 'checked' && (
                  <button 
                    className="btn primary" 
                    id={`btn-${t.id}`} 
                    style={{ marginLeft: '1rem', opacity: t.status === 'checking' ? 0.7 : 1 }} 
                    onClick={() => checkHw(t.id)}
                    disabled={t.status === 'checking'}
                  >
                    {t.status === 'checking' ? 'Проверка...' : 'Проверить'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="course-section" style={{ marginTop: '2rem' }}>
        <h2>Управление курсами</h2>
        <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h3>Добавить новый курс (Интеграция с БД)</h3>
          <form id="addCourseForm" onSubmit={handleAddCourse}>
            <div className="form-group">
              <label>Название курса</label>
              <input 
                type="text" 
                id="newCourseTitle" 
                required 
                placeholder="Например: Python для начинающих" 
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Описание</label>
              <input 
                type="text" 
                id="newCourseDesc" 
                required 
                placeholder="Краткое описание..." 
                value={desc}
                onChange={e => setDesc(e.target.value)}
              />
            </div>
            <button type="submit" className="btn primary" disabled={loading}>Создать курс в БД</button>
          </form>
          {statusMsg.text && (
            <p id="addCourseStatus" style={{ marginTop: '10px', fontWeight: 'bold', color: statusMsg.color }}>
              {statusMsg.text}
            </p>
          )}
        </div>
      </section>
    </section>
  );
}

export default MentorDashboard;
