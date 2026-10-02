import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../mockDB';

function Certificate({ currentUser }) {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('ru-RU');

  const printCert = () => {
    window.print();
  };

  return (
    <section id="view-certificate" className="view active">
      <button className="btn-text back-btn" onClick={() => navigate('/student-dashboard')}>← Назад в профиль</button>
      <div className="certificate-wrapper">
        <div className="certificate" id="certDownloadArea">
          <div className="cert-bg"></div>
          <div className="cert-header">IT Mentor Platform</div>
          <h1>СЕРТИФИКАТ</h1>
          <p>Настоящим подтверждается, что студент</p>
          <h2 id="certStudentName">{currentUser?.name}</h2>
          <p>успешно прошел(а) программу обучения и сдал(а) финальный экзамен по курсу</p>
          <h3 id="certCourseName">{DB.course.title}</h3>
          <div className="cert-footer">
            <span>Дата выдачи: <span id="certDate">{today}</span></span>
            <span className="signature">Директор: _ _ _ _ _ _ _ _ _ _ _ _</span>
          </div>
        </div>
        <button className="btn primary mt-4" onClick={printCert}>Печать / Сохранить как PDF</button>
      </div>
    </section>
  );
}

export default Certificate;
