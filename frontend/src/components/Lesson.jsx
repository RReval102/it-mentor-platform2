import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../mockDB';

function Lesson() {
  const navigate = useNavigate();
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [testResult, setTestResult] = useState({ text: '', type: '' });
  const [lessons, setLessons] = useState(DB.course.lessons);

  useEffect(() => {
    // Find first incomplete, or default to last lesson
    const nextLesson = lessons.find(l => !l.completed) || lessons[lessons.length - 1];
    setActiveLessonId(nextLesson.id);
  }, []);

  const activeLesson = lessons.find(l => l.id === activeLessonId);

  useEffect(() => {
    setSelectedOpt(null);
    if (activeLesson?.isTest && activeLesson?.completed) {
      setTestResult({ text: '✅ Вы уже успешно сдали этот тест.', type: 'success' });
    } else {
      setTestResult({ text: '', type: '' });
    }
  }, [activeLessonId, activeLesson]);

  if (!activeLesson) return null;

  const submitTest = () => {
    if (selectedOpt === null) {
      setTestResult({ text: '❗ Пожалуйста, выберите вариант ответа.', type: 'error-msg' });
      return;
    }

    if (parseInt(selectedOpt) === activeLesson.test.correct) {
      setTestResult({ text: '🎉 Правильно! Курс успешно завершен. Создаем сертификат...', type: 'success' });
      
      const updatedLessons = lessons.map(l => l.id === activeLessonId ? { ...l, completed: true } : l);
      setLessons(updatedLessons);
      DB.course.lessons = updatedLessons;
      localStorage.setItem('itmentor_cert_earned', 'true');
      
      setTimeout(() => {
        navigate('/certificate');
      }, 2000);
    } else {
      setTestResult({ text: '❌ Неверный ответ. Повторите материал и попробуйте снова.', type: 'error-msg' });
    }
  };

  return (
    <section id="view-lesson" className="view active">
      <button className="btn-text back-btn" onClick={() => navigate('/student-dashboard')}>← Назад к курсам</button>
      <div className="lesson-layout">
        <div className="lesson-content">
          <h2 id="lessonTitle">{activeLesson.title}</h2>
          <div className="video-placeholder">
            <span id="videoText">{activeLesson.isTest ? '📝 Экзамен' : '▶ Видеоплеер (Заглушка)'}</span>
          </div>
          <div className="lesson-text" id="lessonText">
            {activeLesson.text}
          </div>
          
          {activeLesson.isTest && (
            <div className="test-section" id="testSection">
              <h3>Тестирование по курсу</h3>
              <p className="test-desc">Пройдите финальный тест, чтобы получить сертификат об окончании.</p>
              <div id="testQuestion" className="test-q">{activeLesson.test.question}</div>
              <div className="options-list" id="testOptions">
                {activeLesson.test.options.map((opt, idx) => (
                  <label key={idx}>
                    <input 
                      type="radio" 
                      name="testOpt" 
                      value={idx} 
                      checked={parseInt(selectedOpt) === idx}
                      onChange={(e) => setSelectedOpt(e.target.value)} 
                    /> 
                    {opt}
                  </label>
                ))}
              </div>
              <button className="btn primary mt-4" onClick={submitTest}>Ответить</button>
              {testResult.text && (
                <p id="testResult" className={`test-result ${testResult.type}`}>{testResult.text}</p>
              )}
            </div>
          )}

        </div>
        <div className="lesson-sidebar">
          <h3>Список уроков</h3>
          <ul className="lesson-list" id="lessonSidebarList">
            {lessons.map(l => (
              <li 
                key={l.id} 
                onClick={() => setActiveLessonId(l.id)} 
                id={`sidebar-lesson-${l.id}`}
                className={l.id === activeLessonId ? 'active' : ''}
              >
                {l.title} <span style={{ marginLeft: 'auto' }}>{l.completed ? '✅' : '🔒'}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Lesson;
