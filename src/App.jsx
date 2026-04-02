import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  ListTodo, 
  KanbanSquare, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  MoreVertical,
  Check
} from 'lucide-react';
import './index.css';

const App = () => {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5001/api/dashboard')
      .then(res => res.json())
      .then(json => {
        setData(json);
        // Small delay for fade-in animation
        setTimeout(() => setLoaded(true), 100);
      })
      .catch(err => console.error("Error fetching dashboard data:", err));
  }, []);

  if (!data) {
    return (
      <div className="app-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="7" r="4" />
              <circle cx="5" cy="17" r="4" />
              <circle cx="19" cy="17" r="4" />
            </svg>
          </div>
          Task <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--accent-primary)', marginLeft: '8px', padding: '2px 6px', background: 'rgba(240,106,106,0.1)', borderRadius: '10px'}}>Manager</span>
        </div>

        <ul className="nav-menu">
          <li className="nav-item active">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </li>
          <li className="nav-item">
            <CheckCircle2 size={20} />
            <span>My Tasks</span>
          </li>
          <li className="nav-item">
            <ListTodo size={20} />
            <span>Core Platform</span>
          </li>
          <li className="nav-item">
            <KanbanSquare size={20} />
            <span>Projects</span>
          </li>
          <li className="nav-item">
            <Users size={20} />
            <span>Team</span>
          </li>
          <li className="nav-item" style={{ marginTop: 'auto' }}>
            <Settings size={20} />
            <span>Settings</span>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div style={{ position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search tasks, projects, or people..." 
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--card-border)',
                padding: '10px 10px 10px 40px',
                borderRadius: '20px',
                color: 'var(--text-main)',
                width: '300px',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div className="user-profile">
            <button className="btn-icon" style={{ marginRight: '1rem', position: 'relative' }}>
              <Bell size={24} />
              <span style={{
                position: 'absolute', top: '0', right: '0', width: '8px', height: '8px', background: 'var(--accent-primary)', borderRadius: '50%'
              }}></span>
            </button>
            <div className="user-info" style={{ textAlign: 'right' }}>
              <h3>{data.user.name}</h3>
              <p>{data.user.role}</p>
            </div>
            <img src={data.user.avatar} alt="Profile" />
          </div>
        </header>

        <div className={`dashboard-content ${loaded ? 'animate-fade-in' : ''}`} style={{ opacity: loaded ? 1 : 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontWeight: 700, fontSize: '2.4rem' }}>Good morning, Sarah! ☀️</h1>
              <p style={{ fontSize: '1.1rem' }}>Here's what's happening with the Core Platform team today.</p>
            </div>
            <button style={{
              background: 'var(--accent-primary)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-neon)',
              fontFamily: 'inherit'
            }}>
              <Plus size={20} /> Create Item
            </button>
          </div>

          <div className="dashboard-grid">
            <div className="col-full" style={{ marginBottom: '1.5rem' }}>
              <div className="stats-grid">
                {data.stats.map((stat, i) => (
                  <div key={i} className="glass stat-card" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className={`stat-trend ${stat.trend.startsWith('-') ? 'negative' : ''}`}>
                      {stat.trend}
                    </div>
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Left Column - Tasks */}
            <div className="col-two-third glass" style={{ padding: '1.5rem' }}>
              <div className="card-title">
                <h2 style={{ margin: 0 }}>My Prioritized Tasks</h2>
                <button className="btn-icon"><MoreVertical size={20} /></button>
              </div>
              
              <div className="task-list">
                {data.tasks.map(task => (
                  <div key={task.id} className="task-item">
                    <div className="task-main">
                      <div className="checkbox">
                        {/* <Check size={14} color="transparent" /> */}
                      </div>
                      <div>
                        <div className="task-title">{task.title}</div>
                        <div className="task-meta">
                          <span className="task-project" style={{ '--accent-primary': task.project.includes('Graph') ? 'var(--color-green)' : 'var(--color-purple)' }}>{task.project}</span>
                          <span>•</span>
                          <span style={{ color: task.dueDate === 'Today' ? 'var(--accent-primary)' : 'inherit' }}>{task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="custom-badges">
                      <span className={`badge priority-${task.priority}`}>{task.priority}</span>
                      {task.customFields.map((field, i) => (
                        <span key={i} className="badge">
                          {field.name}: {field.value}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Projects & Activity */}
            <div className="col-third" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div className="glass" style={{ padding: '1.5rem' }}>
                <div className="card-title">
                  <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Key Initiatives</h2>
                  <button className="btn-icon"><Plus size={18} /></button>
                </div>
                <div className="project-list">
                  {data.projects.map(proj => (
                    <div key={proj.id} className="project-item">
                      <div className="project-header">
                         <span className="project-name">{proj.name}</span>
                         <span className="project-status" style={{ 
                            color: proj.status === 'On Track' ? 'var(--color-green)' : 'var(--accent-primary)',
                            background: proj.status === 'On Track' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(240, 106, 106, 0.1)'
                          }}>
                           {proj.status}
                         </span>
                      </div>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ 
                          width: `${proj.progress}%`,
                          background: proj.color === 'coral' ? 'var(--accent-primary)' : `var(--color-${proj.color})`
                        }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>



            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
