import React, { useEffect, useState } from 'react';
import { Trash2, Monitor, Globe, Clock, MapPin, Shield, Calendar, LogOut, Eye, Info, Smartphone, Hexagon } from 'lucide-react';

const defaultSessions = [
  {
    id: '1',
    isCurrent: true,
    deviceName: 'Windows Laptop',
    deviceType: 'Laptop',
    os: 'Windows 11',
    browser: 'Chrome',
    ipAddress: 'xxx.xxx.xxx.xxx',
    location: 'Bhubaneswar, Odisha, India',
    loginTime: '10 Aug 2026, 09:42 AM',
    lastActive: 'Just now',
    status: 'Active'
  },
  {
    id: '2',
    isCurrent: false,
    deviceName: 'Office Desktop',
    deviceType: 'Desktop',
    os: 'Windows 10',
    browser: 'Firefox',
    ipAddress: 'xxx.xxx.xxx.xxx',
    location: 'Cuttack, Odisha, India',
    loginTime: '10 Aug 2026, 09:15 PM',
    lastActive: 'Just now',
    status: 'Active'
  },
  {
    id: '3',
    isCurrent: false,
    deviceName: 'Personal Laptop',
    deviceType: 'Laptop',
    os: 'Windows 11',
    browser: 'Edge',
    ipAddress: 'xxx.xxx.xxx.xxx',
    location: 'Puri, Odisha, India',
    loginTime: '09 Aug 2026, 09:30 AM',
    lastActive: '1 hour ago',
    status: 'Idle'
  },
  {
    id: '4',
    isCurrent: false,
    deviceName: 'Android Mobile',
    deviceType: 'Mobile',
    os: 'Android 13',
    browser: 'NEXORA App',
    ipAddress: 'xxx.xxx.xxx.xxx',
    location: 'Bhubaneswar, Odisha, India',
    loginTime: '08 Aug 2026, 07:45 PM',
    lastActive: '2 hours ago',
    status: 'Idle'
  }
];

export default function AS6Page({ onBack, sessions = defaultSessions }) {
  const [activeSessionsList, setActiveSessionsList] = useState(sessions);
  const [selectedSessionDetails, setSelectedSessionDetails] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentSession = activeSessionsList.find(s => s.isCurrent);
  const otherSessions = activeSessionsList.filter(s => !s.isCurrent);

  const handleTerminate = (id) => {
    setActiveSessionsList(prev => prev.filter(s => s.id !== id));
  };

  const handleTerminateAll = () => {
    setActiveSessionsList(prev => prev.filter(s => s.isCurrent));
  };

  const getDeviceIcon = (deviceType) => {
    const type = (deviceType || '').toLowerCase();
    if (type.includes('mobile') || type.includes('phone') || type.includes('tablet') || type.includes('ipad')) return 'Smartphone';
    return 'Monitor';
  };

  const getTheme = (status) => {
    return status === 'Active' ? 'green' : 'orange';
  };

  const getBrowserInfo = (browser) => {
    const b = (browser || '').toLowerCase();
    if (b.includes('firefox')) return { iconName: 'Globe', iconUrl: null };
    if (b.includes('edge')) return { iconName: 'Globe', iconUrl: null };
    if (b.includes('chrome')) return { iconName: 'Globe', iconUrl: null };
    if (b.includes('nexora')) return { iconName: 'Hexagon', iconUrl: null };
    return { iconName: 'Globe', iconUrl: null };
  };

  const getOsIcon = (os) => {
    const o = (os || '').toLowerCase();
    if (o.includes('windows') || o.includes('mac') || o.includes('linux')) return 'Monitor';
    if (o.includes('android') || o.includes('ios')) return 'Smartphone';
    return 'Monitor';
  };

  const renderIcon = (iconName, iconUrl, size = 16, className = "text-blue-600") => {
    if (iconUrl) {
      return <img src={iconUrl} alt="icon" className={`object-contain`} style={{ width: size, height: size }} />;
    }
    switch (iconName) {
      case 'Monitor': return <Monitor size={size} className={className} strokeWidth={1.5} />;
      case 'Globe': return <Globe size={size} className={className} />;
      case 'Smartphone': return <Smartphone size={size} className={className} strokeWidth={1.5} />;
      case 'Hexagon': return <Hexagon size={size} className={className} />;
      default: return null;
    }
  };

  const renderStatusBadge = (status) => {
    if (status === 'Active') {
      return (
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full w-fit uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm"></span> Active
        </div>
      );
    }
    if (status === 'Idle') {
      return (
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full w-fit uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-sm"></span> Idle
        </div>
      );
    }
    return null;
  };

  const renderSessionGrid = (session) => {
    if (session.isCurrent) {
      return (
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-7 gap-x-6 pt-2">
          {/* Row 1 */}
          <div className="flex items-start gap-3">
            <Monitor className="text-blue-600 mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-[13px] font-bold text-gray-800 mb-0.5">Device Type</p>
              <p className="text-sm text-gray-600 font-medium">{session.deviceType}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Monitor className="text-blue-600 mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-[13px] font-bold text-gray-800 mb-0.5">Operating System</p>
              <p className="text-sm text-gray-600 font-medium">{session.os}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Globe className="text-blue-600 mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-[13px] font-bold text-gray-800 mb-0.5">Browser / Application</p>
              <p className="text-sm text-gray-600 font-medium">{session.browser}</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-start gap-3">
            <Globe className="text-blue-600 mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-[13px] font-bold text-gray-800 mb-0.5">IP Address</p>
              <p className="text-sm text-gray-600 font-medium">{session.ipAddress}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="text-blue-600 mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-[13px] font-bold text-gray-800 mb-0.5">Location</p>
              <p className="text-sm text-gray-600 font-medium">{session.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="text-blue-600 mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-[13px] font-bold text-gray-800 mb-0.5">Login Date & Time</p>
              <p className="text-sm text-gray-600 font-medium">{session.loginTime}</p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex items-start gap-3">
            <Clock className="text-blue-600 mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-[13px] font-bold text-gray-800 mb-0.5">Last Active</p>
              <p className="text-sm text-gray-600 font-medium">{session.lastActive}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="text-blue-600 mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-[13px] font-bold text-gray-800 mb-1.5">Session Status</p>
              {renderStatusBadge(session.status)}
            </div>
          </div>
          <div className="flex items-end justify-start sm:justify-end mt-4 sm:mt-0">
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex items-center justify-center gap-2 border border-green-600 text-green-700 hover:bg-green-50 px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm w-full sm:w-auto"
            >
              <LogOut size={18} className="rotate-180" /> Logout
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6 xl:border-l xl:border-gray-100 xl:pl-8">
          <div className="flex items-start gap-3">
            {session.deviceType === 'Mobile' ? <Smartphone className="text-blue-600 mt-0.5 shrink-0" size={18} /> : <Monitor className="text-blue-600 mt-0.5 shrink-0" size={18} />}
            <div>
              <p className="text-[13px] font-bold text-gray-800 mb-0.5">Device Type</p>
              <p className="text-sm text-gray-600 font-medium">{session.deviceType}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Globe className="text-blue-600 mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-[13px] font-bold text-gray-800 mb-0.5">IP Address</p>
              <p className="text-sm text-gray-600 font-medium">{session.ipAddress}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="text-blue-600 mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-[13px] font-bold text-gray-800 mb-0.5">Login Date & Time</p>
              <p className="text-sm text-gray-600 font-medium">{session.loginTime}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="text-blue-600 mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-[13px] font-bold text-gray-800 mb-0.5">Location</p>
              <p className="text-sm text-gray-600 font-medium">{session.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="text-blue-600 mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-[13px] font-bold text-gray-800 mb-0.5">Last Active</p>
              <p className="text-sm text-gray-600 font-medium">{session.lastActive}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="text-blue-600 mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-[13px] font-bold text-gray-800 mb-1.5">Session Status</p>
              {renderStatusBadge(session.status)}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full relative pt-11 sm:pt-4 bg-transparent min-h-screen">
      {onBack && (
        <button onClick={onBack}
          className="absolute top-1.5 left-3 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm">
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Back</span>
        </button>
      )}

      <div className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1e2a52] mb-2">Active Sessions</h1>
            <p className="text-sm sm:text-base text-gray-600 font-medium">View and manage all the devices that are currently signed in to your account.</p>
          </div>
          <button
            onClick={handleTerminateAll}
            className="flex items-center justify-center gap-2 border border-red-400 text-red-500 hover:bg-red-50 px-4 py-2.5 rounded-lg font-bold text-sm transition-colors whitespace-nowrap self-start shadow-sm"
          >
            <Trash2 size={18} />
            <span>Terminate All Other Sessions</span>
          </button>
        </div>

        {/* Current Session */}
        {currentSession && (
          <div className="mb-10">
            <h2 className="text-sm font-bold text-blue-800 tracking-wider mb-3">CURRENT SESSION</h2>

            <div className="bg-[#f4fcf6] border border-green-200 rounded-xl p-5 sm:p-6 lg:p-8 relative shadow-sm">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

                {/* Device Image & Info */}
                <div className="flex flex-row lg:flex-col items-center lg:items-start gap-5 lg:w-[240px] shrink-0 border-b lg:border-b-0 lg:border-r border-green-200/60 pb-6 lg:pb-0 lg:pr-6">
                  <div className="flex flex-col items-center justify-center gap-4 w-32">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center shadow-inner border border-green-100">
                      {renderIcon(getDeviceIcon(currentSession.deviceType), null, 48, "text-slate-800")}
                    </div>
                    <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full whitespace-nowrap">This Device</span>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <h3 className="text-lg font-bold text-[#1e2a52] mt-1 lg:mt-2">{currentSession.deviceName}</h3>
                    <div className="flex items-center gap-2 text-sm font-bold text-green-600">
                      <span className="w-2 h-2 rounded-full bg-green-500 inline-block shadow-sm"></span>
                      Active — This Device
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-700 font-bold">
                      <div className="flex items-center gap-1.5">{renderIcon(getBrowserInfo(currentSession.browser).iconName, getBrowserInfo(currentSession.browser).iconUrl, 16, "text-blue-500")} {currentSession.browser}</div>
                      {currentSession.os && <span className="w-1 h-1 rounded-full bg-gray-400"></span>}
                      {currentSession.os && <div className="flex items-center gap-1.5">{renderIcon(getOsIcon(currentSession.os), null, 16, "text-blue-600")} {currentSession.os}</div>}
                    </div>
                  </div>
                </div>

                {renderSessionGrid(currentSession)}
              </div>
            </div>
          </div>
        )}

        {/* Other Active Sessions */}
        {otherSessions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-blue-800 tracking-wider mb-3">OTHER ACTIVE SESSIONS</h2>

            <div className="flex flex-col gap-4">
              {otherSessions.map(session => (
                <div key={session.id} className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 lg:p-7 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">

                    {/* Device Info */}
                    <div className="flex items-center gap-5 xl:w-[260px] shrink-0">
                      <div className={`w-[72px] h-[72px] ${getTheme(session.status) === 'orange' ? 'bg-orange-50 border-orange-100' : getTheme(session.status) === 'indigo' ? 'bg-indigo-50 border-indigo-100' : 'bg-blue-50 border-blue-100'} border rounded-full flex items-center justify-center shrink-0 shadow-inner`}>
                        {renderIcon(getDeviceIcon(session.deviceType), null, 32, "text-slate-800")}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <h3 className="text-base font-bold text-[#1e2a52]">{session.deviceName}</h3>
                        <div className={`flex items-center gap-2 text-[13px] font-bold ${session.status === 'Active' ? 'text-green-600' : 'text-orange-500'}`}>
                          <span className={`w-2 h-2 rounded-full ${session.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'} inline-block shadow-sm`}></span> {session.status}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-700 font-bold">
                          <div className="flex items-center gap-1.5">{renderIcon(getBrowserInfo(session.browser).iconName, getBrowserInfo(session.browser).iconUrl, 14, getTheme(session.status) === 'orange' ? 'text-slate-800 fill-slate-800' : 'text-blue-500')} {session.browser}</div>
                          {session.os && <span className="w-1 h-1 rounded-full bg-gray-400"></span>}
                          {session.os && <div className="flex items-center gap-1.5">{renderIcon(getOsIcon(session.os), null, 14, "text-blue-600")} {session.os}</div>}
                        </div>
                      </div>
                    </div>

                    {renderSessionGrid(session)}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row xl:flex-col justify-center gap-3 xl:w-[170px] shrink-0 xl:border-l xl:border-gray-100 xl:pl-6 mt-4 xl:mt-0">
                      <button
                        onClick={() => setSelectedSessionDetails(session)}
                        className="flex-1 xl:flex-none flex items-center justify-center gap-2 border border-blue-200 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-bold text-[13px] transition-colors shadow-sm"
                      >
                        <Eye size={16} /> View Details
                      </button>
                      <button
                        onClick={() => handleTerminate(session.id)}
                        className="flex-1 xl:flex-none flex items-center justify-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg font-bold text-[13px] transition-colors shadow-sm"
                      >
                        <Trash2 size={16} /> Terminate Session
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Note block */}
        <div className="bg-[#f0f5ff] border border-blue-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
          <div className="bg-blue-600 text-white rounded-full p-2 mt-0.5 shadow-sm">
            <Info size={20} />
          </div>
          <div>
            <h4 className="font-bold text-[#1e2a52] mb-1.5">Note</h4>
            <p className="text-sm text-gray-700 font-medium leading-relaxed">Current session cannot be terminated. You can logout from this device using the Logout button.</p>
          </div>
        </div>

      </div>

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-fade-in relative">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-600">
                <LogOut size={24} className="rotate-180" />
              </div>
              <h3 className="text-xl font-bold text-[#1e2a52] mb-2">Logout Confirmation</h3>
              <p className="text-sm text-gray-600 font-medium mb-6">
                Are you sure you want to log out? Choose whether to log out from this device only or all devices.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsLogoutModalOpen(false);
                    window.location.hash = '';
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#1e2a52] hover:bg-blue-950 text-white px-4 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm"
                >
                  Log out from this device
                </button>
                <button
                  onClick={() => {
                    setIsLogoutModalOpen(false);
                    window.location.hash = '';
                  }}
                  className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm"
                >
                  Log out from all devices
                </button>
                <button
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="w-full flex items-center justify-center gap-2 mt-2 text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg font-bold text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Session Details Modal */}
      {selectedSessionDetails && (
        <div className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in relative">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#1e2a52]">Session Details</h3>
                <button onClick={() => setSelectedSessionDetails(null)} className="text-gray-400 hover:text-gray-600 p-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              <div className="flex flex-col gap-5 bg-gray-50 p-5 rounded-xl border border-gray-100 mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${getTheme(selectedSessionDetails.status) === 'orange' ? 'bg-orange-100 text-orange-600' : getTheme(selectedSessionDetails.status) === 'indigo' ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-blue-600'} rounded-full flex items-center justify-center shrink-0`}>
                    {renderIcon(getDeviceIcon(selectedSessionDetails.deviceType), null, 24, "currentColor")}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{selectedSessionDetails.deviceName}</h4>
                    <p className="text-sm font-medium text-gray-500">{selectedSessionDetails.deviceType}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  <div>
                    <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Browser & OS</p>
                    <p className="text-sm text-gray-800 font-medium">{selectedSessionDetails.browser} {selectedSessionDetails.os ? `· ${selectedSessionDetails.os}` : ''}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">IP Address</p>
                    <p className="text-sm text-gray-800 font-medium">{selectedSessionDetails.ipAddress}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Location</p>
                    <p className="text-sm text-gray-800 font-medium">{selectedSessionDetails.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Status</p>
                    <p className={`text-sm font-bold ${selectedSessionDetails.status === 'Active' ? 'text-green-600' : 'text-orange-500'}`}>{selectedSessionDetails.status}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Login Time</p>
                    <p className="text-sm text-gray-800 font-medium">{selectedSessionDetails.loginTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Last Active</p>
                    <p className="text-sm text-gray-800 font-medium">{selectedSessionDetails.lastActive}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleTerminate(selectedSessionDetails.id);
                    setSelectedSessionDetails(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm"
                >
                  <Trash2 size={16} /> Terminate Session
                </button>
                <button
                  onClick={() => setSelectedSessionDetails(null)}
                  className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-bold text-sm transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
