import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../mockDB';

function StudentDashboard({ currentUser }) {
  const navigate = useNavigate();

  const hasCert = localStorage.getItem('itmentor_cert_earned') === 'true';
  
  let completedLessons = DB.course.lessons.filter(l => l.completed).length;
  if (hasCert && completedLessons < DB.course.lessons.length) {
      DB.course.lessons.forEach(l => l.completed = true);
      completedLessons = DB.course.lessons.length;
  }

  const totalLessons = DB.course.lessons.length;
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  return (
    <section id="view-student-dashboard" className="view active">
      <header className="dashboard-header">
        <h1 id="studentWelcome">Привет, {currentUser.name}! 👋</h1>
        <p>Продолжите свое обучение с того места, где остановились.</p>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <h3>Пройдено уроков</h3>
          <div className="value" id="statsLessons">{completedLessons} / {totalLessons}</div>
        </div>
        <div className="stat-card">
          <h3>Средний балл</h3>
          <div className="value accent">95%</div>
        </div>
        <div className="stat-card">
          <h3>Сертификаты</h3>
          <div className="value success" id="certCount">{hasCert ? '1' : '0'}</div>
        </div>
      </section>

      <section className="courses-section">
        <h2>Мои курсы</h2>
        <div id="studentCoursesList">
          <div className="course-card">
            <div className="course-info">
              <div className="course-tag">Тестирование</div>
              <h3>{DB.course.title}</h3>
              <p>{DB.course.description}</p>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <span className="progress-text">{progressPercent}% завершено</span>
            </div>
            <div className="course-actions">
              <button className="btn primary full-width" onClick={() => navigate('/lesson')}>Продолжить обучение</button>
              <button id="paymentButton" className="btn full-width mt-4" style={{ backgroundColor: 'red', color: 'white', marginTop: '10px' }}>Оплатить следующий модуль</button>
              {hasCert && (
                <button className="btn success full-width mt-4" onClick={() => navigate('/certificate')}>Посмотреть сертификат 🏆</button>
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default StudentDashboard;
