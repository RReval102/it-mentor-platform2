import React from 'react';

function Navbar({ currentUser, onLogout }) {
  if (!currentUser) return null;

  return (
    <nav className="navbar" id="navbar">
      <div className="logo">
        <span className="logo-icon">{'{'}{'}'}</span> IT Mentor
      </div>
      <div className="nav-links" id="navLinks">
        {/* Dynamic links based on role can be added here */}
      </div>
      <div className="user-profile">
        <span className="role-badge" id="userRoleBadge">
          {currentUser.role === 'student' ? 'Студент' : 'Ментор'}
        </span>
        <span className="user-name" id="userNameDisplay">{currentUser.name}</span>
        <button className="btn-text" onClick={onLogout}>Выйти</button>
      </div>
    </nav>
  );
}

export default Navbar;
