import React, { useState } from 'react';
import {
  Bell,
  Volume2,
  ShieldAlert,
  Clock,
  Settings,
  Save,
  ArrowLeft,
  Check,
  ChevronDown,
  Monitor,
  Shield,
  Zap,
  Megaphone,
  RotateCcw
} from 'lucide-react';

import chimeSound from '../../assets/sounds/chime.mp3';
import bellSound from '../../assets/sounds/bell.mp3';
import pingSound from '../../assets/sounds/ping.mp3';
import subtleSound from '../../assets/sounds/subtle.mp3';

const SAVED_NOTIF_KEY = 'nexora_notification_settings_v1';

const DEFAULT_SETTINGS = {
  enableNotifications: true,
  showOnDesktop: true,
  position: 'Top Right',
  enableSound: true,
  selectedSound: 'Chime',
  volume: 70,
  systemAlerts: true,
  securityAlerts: true,
  activityAlerts: true,
  marketingAlerts: false,
  durationOption: '5 Seconds',
  doNotDisturb: false,
  importantAlerts: true
};

// Sound file path registry mapping notification sound names to imported MP3 assets
const SOUND_FILES = {
  Chime: chimeSound,
  Bell: bellSound,
  Ping: pingSound,
  Subtle: subtleSound
};

// Web Audio API Synthesizer Fallback for offline/instant play
function playSynthesizedSound(soundName, volumeLevel) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const now = ctx.currentTime;
    const gainNode = ctx.createGain();
    const vol = Math.max(0, Math.min(1, volumeLevel));
    gainNode.gain.setValueAtTime(vol * 0.5, now);
    gainNode.connect(ctx.destination);

    if (soundName === 'Chime') {
      // Dual harmonic chime tones (E5 & B5)
      [659.25, 987.77].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        osc.connect(gainNode);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.6);
      });
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    } else if (soundName === 'Bell') {
      // High-grade crystal brass bell resonance (C5 fundamental + C6 harmonic overlay)
      [523.25, 1046.5, 1567.98].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.connect(gainNode);
        osc.start(now);
        osc.stop(now + 1.2);
      });
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    } else if (soundName === 'Ping') {
      // High UI ping tone (G6)
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1567.98, now);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.3);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    } else {
      // Subtle soft blip tone (A4)
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.2);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    }
  } catch (err) {
    console.warn('Audio Synthesis Error:', err);
  }
}

// Play notification sound by name & volume (0 to 100)
function playNotificationSound(soundName = 'Chime', volume = 70) {
  const filePath = SOUND_FILES[soundName] || SOUND_FILES.Chime;
  const volumeLevel = Math.max(0, Math.min(1, volume / 100));

  if (volumeLevel === 0) return;

  try {
    const audio = new Audio(filePath);
    audio.volume = volumeLevel;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('HTML5 Audio play prevented or unavailable, using Web Audio synthesizer fallback:', err);
        playSynthesizedSound(soundName, volumeLevel);
      });
    }
  } catch (err) {
    console.warn('HTML5 Audio creation failed, using Web Audio synthesizer fallback:', err);
    playSynthesizedSound(soundName, volumeLevel);
  }
}

export default function NotificationSettingPage({ onBack }) {
  // Load saved settings from localStorage on initial render
  const getSavedSettings = () => {
    try {
      const saved = localStorage.getItem(SAVED_NOTIF_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('LocalStorage access error:', e);
    }
    return DEFAULT_SETTINGS;
  };

  const initialSettings = getSavedSettings();

  // Panel 1 State: Notification Behavior
  const [enableNotifications, setEnableNotifications] = useState(initialSettings.enableNotifications);
  const [showOnDesktop, setShowOnDesktop] = useState(initialSettings.showOnDesktop);
  const [position, setPosition] = useState(initialSettings.position);
  const [positionDropdownOpen, setPositionDropdownOpen] = useState(false);

  // Panel 2 State: Sounds
  const [enableSound, setEnableSound] = useState(initialSettings.enableSound);
  const [selectedSound, setSelectedSound] = useState(initialSettings.selectedSound);
  const [soundDropdownOpen, setSoundDropdownOpen] = useState(false);
  const [volume, setVolume] = useState(initialSettings.volume);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Panel 3 State: Alerts
  const [systemAlerts, setSystemAlerts] = useState(initialSettings.systemAlerts);
  const [securityAlerts, setSecurityAlerts] = useState(initialSettings.securityAlerts);
  const [activityAlerts, setActivityAlerts] = useState(initialSettings.activityAlerts);
  const [marketingAlerts, setMarketingAlerts] = useState(initialSettings.marketingAlerts);

  // Panel 4 State: Duration
  const [durationOption, setDurationOption] = useState(initialSettings.durationOption);

  // Panel 5 State: Notification Preferences
  const [doNotDisturb, setDoNotDisturb] = useState(initialSettings.doNotDisturb);
  const [importantAlerts, setImportantAlerts] = useState(initialSettings.importantAlerts);

  // Global Save Toast & Message
  const [savedToast, setSavedToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Notification Settings saved & fixed successfully!');

  // Play real audio sound on click or sound change
  const handlePlaySound = (soundName = selectedSound, vol = volume) => {
    setIsPlayingAudio(true);
    playNotificationSound(soundName, vol);
    setTimeout(() => setIsPlayingAudio(false), 1200);
  };

  const handleSave = () => {
    const updatedSettings = {
      enableNotifications,
      showOnDesktop,
      position,
      enableSound,
      selectedSound,
      volume,
      systemAlerts,
      securityAlerts,
      activityAlerts,
      marketingAlerts,
      durationOption,
      doNotDisturb,
      importantAlerts
    };

    try {
      localStorage.setItem(SAVED_NOTIF_KEY, JSON.stringify(updatedSettings));
    } catch (e) {
      console.warn('Failed to save notification settings to localStorage:', e);
    }

    setToastMessage('Notification Settings saved & fixed successfully!');
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleReset = () => {
    setEnableNotifications(DEFAULT_SETTINGS.enableNotifications);
    setShowOnDesktop(DEFAULT_SETTINGS.showOnDesktop);
    setPosition(DEFAULT_SETTINGS.position);
    setEnableSound(DEFAULT_SETTINGS.enableSound);
    setSelectedSound(DEFAULT_SETTINGS.selectedSound);
    setVolume(DEFAULT_SETTINGS.volume);
    setSystemAlerts(DEFAULT_SETTINGS.systemAlerts);
    setSecurityAlerts(DEFAULT_SETTINGS.securityAlerts);
    setActivityAlerts(DEFAULT_SETTINGS.activityAlerts);
    setMarketingAlerts(DEFAULT_SETTINGS.marketingAlerts);
    setDurationOption(DEFAULT_SETTINGS.durationOption);
    setDoNotDisturb(DEFAULT_SETTINGS.doNotDisturb);
    setImportantAlerts(DEFAULT_SETTINGS.importantAlerts);

    try {
      localStorage.removeItem(SAVED_NOTIF_KEY);
    } catch (e) {
      console.warn('Failed to clear localStorage on reset:', e);
    }

    setToastMessage('Notification Settings reset to default values!');
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const positions = ['Top Right', 'Top Left', 'Bottom Right', 'Bottom Left'];
  const sounds = ['Chime', 'Bell', 'Ping', 'Subtle'];
  const durations = ['3 Seconds', '5 Seconds', '10 Seconds', 'Until Dismissed'];

  // Helper for dynamic screen toast position
  const getToastPositionClass = (pos) => {
    switch (pos) {
      case 'Top Left':
        return 'top-6 left-6';
      case 'Bottom Right':
        return 'bottom-6 right-6';
      case 'Bottom Left':
        return 'bottom-6 left-6';
      case 'Top Right':
      default:
        return 'top-6 right-6';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Back to Dashboard Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-200 shadow-xs hover:shadow-md text-slate-700 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#1e2a52]" />
          <span>Back</span>
        </button>
      )}

      {/* Main Wrapper */}
      <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden space-y-6">

        {/* Dynamic Toast Alert positioning based on user choice */}
        {savedToast && (
          <div className={`fixed ${getToastPositionClass(position)} bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold z-50 transition-all duration-300 animate-bounce`}>
            <Check className="w-5 h-5" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            Notification Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Control notification behavior, sounds, alerts, duration, and notification preferences.
          </p>
        </div>

        {/* TOP ROW GRID (3 PANELS: Behavior, Sounds, Alerts) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* PANEL 1: Notification Behavior */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between space-y-5">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    Notification Behavior
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">
                    Control how notifications appear and behave.
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4 pt-2">
                {/* Switch 1 */}
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="block text-xs font-bold text-slate-800">Enable Notifications</span>
                    <span className="text-[11px] text-slate-400">Turn all notifications on or off</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEnableNotifications(!enableNotifications)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${enableNotifications ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${enableNotifications ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Switch 2 */}
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="block text-xs font-bold text-slate-800">Show on Desktop</span>
                    <span className="text-[11px] text-slate-400">Display browser/desktop notifications</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowOnDesktop(!showOnDesktop)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${showOnDesktop ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${showOnDesktop ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Dropdown Position */}
                <div className="flex items-center justify-between gap-2 pt-1 relative">
                  <div>
                    <span className="block text-xs font-bold text-slate-800">Notification Position</span>
                    <span className="text-[11px] text-slate-400">Choose where notifications appear</span>
                  </div>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setPositionDropdownOpen(!positionDropdownOpen)}
                      className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 flex items-center gap-2 shadow-2xs hover:border-slate-400 cursor-pointer min-w-[100px] justify-between"
                    >
                      <span>{position}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                    {positionDropdownOpen && (
                      <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-30 py-1 min-w-[120px]">
                        {positions.map((pos) => (
                          <div
                            key={pos}
                            onClick={() => {
                              setPosition(pos);
                              setPositionDropdownOpen(false);
                              setToastMessage('Notification position updated!');
                              setSavedToast(true);
                              setTimeout(() => setSavedToast(false), 2500);
                            }}
                            className={`px-3 py-1.5 text-xs font-medium cursor-pointer hover:bg-blue-50 ${position === pos ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-700'}`}
                          >
                            {pos}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* PANEL 2: Sounds */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between space-y-5">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 shadow-2xs">
                  <Volume2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    Sounds
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">
                    Control notification sounds and volume.
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4 pt-2">
                {/* Switch 1 */}
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="block text-xs font-bold text-slate-800">Enable Notification Sound</span>
                    <span className="text-[11px] text-slate-400">Play sound when a notification arrives</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEnableSound(!enableSound)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${enableSound ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${enableSound ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Dropdown Sound + Play Button */}
                <div className="flex items-center justify-between gap-2 pt-1 relative">
                  <div>
                    <span className="block text-xs font-bold text-slate-800">Select Sound</span>
                    <span className="text-[11px] text-slate-400">Choose a notification sound</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setSoundDropdownOpen(!soundDropdownOpen)}
                        className="h-8 px-3.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 flex items-center gap-2 shadow-2xs hover:border-slate-400 cursor-pointer min-w-[95px] justify-between"
                      >
                        <span>{selectedSound}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                      {soundDropdownOpen && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-30 py-1 min-w-[110px]">
                          {sounds.map((snd) => (
                            <div
                              key={snd}
                              onClick={() => {
                                setSelectedSound(snd);
                                setSoundDropdownOpen(false);
                                handlePlaySound(snd, volume);
                              }}
                              className={`px-3 py-1.5 text-xs font-medium cursor-pointer hover:bg-emerald-50 ${selectedSound === snd ? 'text-emerald-600 font-bold bg-emerald-50/50' : 'text-slate-700'}`}
                            >
                              {snd}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePlaySound(selectedSound, volume)}
                      className={`w-8 h-8 rounded-full bg-[#1c2838] hover:bg-[#0f172a] text-white flex items-center justify-center shadow-md active:scale-95 transition-all shrink-0 cursor-pointer ${isPlayingAudio ? 'ring-4 ring-slate-300 animate-pulse' : ''}`}
                      title="Play Sound Preview"
                    >
                      <svg className="w-3.5 h-3.5 fill-white text-white translate-x-[1px]" viewBox="0 0 24 24">
                        <path d="M7 4v16l13-8z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Volume Range Slider */}
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-800">Volume</span>
                    <span className="text-xs font-extrabold text-slate-900">{volume}%</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2">Adjust notification sound volume</p>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => {
                      const newVol = parseInt(e.target.value);
                      setVolume(newVol);
                    }}
                    onMouseUp={() => handlePlaySound(selectedSound, volume)}
                    onTouchEnd={() => handlePlaySound(selectedSound, volume)}
                    className="w-full accent-slate-900 bg-slate-200 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

              </div>
            </div>
          </div>

          {/* PANEL 3: Alerts */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between space-y-5">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 border border-orange-100 shadow-2xs">
                  <ShieldAlert className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    Alerts
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">
                    Choose which alerts you want to receive.
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3.5 pt-1">

                {/* Item 1: System Alerts */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800">System Alerts</span>
                      <span className="text-[10.5px] text-slate-400">Important system updates</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSystemAlerts(!systemAlerts)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${systemAlerts ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${systemAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Item 2: Security Alerts */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800">Security Alerts</span>
                      <span className="text-[10.5px] text-slate-400">Login & security alerts</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSecurityAlerts(!securityAlerts)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${securityAlerts ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${securityAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Item 3: Activity Alerts */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800">Activity Alerts</span>
                      <span className="text-[10.5px] text-slate-400">User activities & actions</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActivityAlerts(!activityAlerts)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${activityAlerts ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${activityAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Item 4: Marketing Alerts */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Megaphone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800">Marketing Alerts</span>
                      <span className="text-[10.5px] text-slate-400">Offers & announcements</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMarketingAlerts(!marketingAlerts)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${marketingAlerts ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${marketingAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW GRID (2 PANELS: Duration, Preferences) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">

          {/* PANEL 4: Duration */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between space-y-5">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 shadow-2xs">
                  <Clock className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    Duration
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">
                    Set how long notifications stay on screen.
                  </p>
                </div>
              </div>

              {/* Radio Option Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {durations.map((dur) => {
                  const isSelected = durationOption === dur;
                  return (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setDurationOption(dur)}
                      className={`px-3 py-3 rounded-xl border text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${isSelected
                          ? 'border-indigo-500 bg-indigo-50/40 text-indigo-700 shadow-2xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                    >
                      <span>{dur}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* PANEL 5: Notification Preferences */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between space-y-5">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 border border-rose-100 shadow-2xs">
                  <Settings className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    Notification Preferences
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">
                    Set additional preferences for notifications.
                  </p>
                </div>
              </div>

              {/* Switches */}
              <div className="space-y-4 pt-1">
                {/* Switch 1: Do Not Disturb */}
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="block text-xs font-bold text-slate-800">Do Not Disturb</span>
                    <span className="text-[11px] text-slate-400">Pause notifications during specific time</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const nextState = !doNotDisturb;
                      setDoNotDisturb(nextState);
                      if (nextState) setImportantAlerts(false);
                    }}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${doNotDisturb ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${doNotDisturb ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Switch 2: Important Alerts */}
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="block text-xs font-bold text-slate-800">Important Alerts</span>
                    <span className="text-[11px] text-slate-400">Always show important alerts</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const nextState = !importantAlerts;
                      setImportantAlerts(nextState);
                      if (nextState) setDoNotDisturb(false);
                    }}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${importantAlerts ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${importantAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ACTION BUTTONS: RESET & SAVE */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-sm font-bold rounded-xl shadow-xs hover:shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2.5 px-8 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save className="w-4.5 h-4.5" />
            <span>Save Changes</span>
          </button>
        </div>

      </div>
    </div>
  );
}
