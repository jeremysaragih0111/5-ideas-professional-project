import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { theme, toggle } = useTheme();
  const [prefs, setPrefs] = useState({
    emailReport: true,
    pushNotif: false,
    weeklyDigest: true,
    twoFactor: false,
  });

  const set = (k) => setPrefs(p => ({ ...p, [k]: !p[k] }));

  return (
    <>
      <div className="page-header">
        <h1>Settings</h1>
        <p>Kelola preferensi dashboard dan akun Anda.</p>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header"><div className="card-title">Profil</div></div>
          <div className="form-group">
            <label className="form-label">Nama Lengkap</label>
            <input className="form-input" defaultValue="Andini Putri" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" defaultValue="andini@nimbus.io" />
          </div>
          <div className="form-group">
            <label className="form-label">Company</label>
            <input className="form-input" defaultValue="Nimbus Labs" />
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">Preferensi</div></div>
          <div className="toggle-row">
            <div>
              <div className="card-title" style={{ fontSize: 14 }}>Dark Mode</div>
              <div className="card-sub">Tema gelap premium untuk kenyamanan mata.</div>
            </div>
            <button className={`toggle ${theme === 'dark' ? 'on' : ''}`} onClick={toggle} />
          </div>
          <div className="toggle-row">
            <div>
              <div className="card-title" style={{ fontSize: 14 }}>Email Report</div>
              <div className="card-sub">Terima laporan bulanan via email.</div>
            </div>
            <button className={`toggle ${prefs.emailReport ? 'on' : ''}`} onClick={() => set('emailReport')} />
          </div>
          <div className="toggle-row">
            <div>
              <div className="card-title" style={{ fontSize: 14 }}>Push Notification</div>
              <div className="card-sub">Notifikasi real-time aktivitas penting.</div>
            </div>
            <button className={`toggle ${prefs.pushNotif ? 'on' : ''}`} onClick={() => set('pushNotif')} />
          </div>
          <div className="toggle-row">
            <div>
              <div className="card-title" style={{ fontSize: 14 }}>Weekly Digest</div>
              <div className="card-sub">Ringkasan performa mingguan.</div>
            </div>
            <button className={`toggle ${prefs.weeklyDigest ? 'on' : ''}`} onClick={() => set('weeklyDigest')} />
          </div>
          <div className="toggle-row">
            <div>
              <div className="card-title" style={{ fontSize: 14 }}>Two-Factor Auth</div>
              <div className="card-sub">Keamanan ekstra untuk akun Anda.</div>
            </div>
            <button className={`toggle ${prefs.twoFactor ? 'on' : ''}`} onClick={() => set('twoFactor')} />
          </div>
        </div>
      </div>
    </>
  );
}