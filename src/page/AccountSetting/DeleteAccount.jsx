import { useState } from "react";
import { 
  Bell, 
  ShieldCheck, 
  PowerOff, 
  ShieldAlert, 
  LockKeyhole,
  CheckCircle2,
  Loader2,
  Briefcase, 
  Building, 
  CalendarOff, 
  UserRoundX, 
  FileWarning, 
  MoreHorizontal,
  Search, 
  Folder, 
  FileText, 
  ClipboardCheck, 
  Download,
  Eye,
  EyeOff
} from "lucide-react";

// --- DeactivationTypeCard ---
function DeactivationTypeCard({
  id,
  title,
  description,
  icon: Icon,
  badgeText,
  badgeType,
  selected,
  onSelect,
}) {
  const isDanger = badgeType === "danger";
  const isWarning = badgeType === "warning";
  const isPrimary = badgeType === "primary";

  let badgeClasses = "bg-gray-100 text-gray-700";
  if (isPrimary) badgeClasses = "bg-blue-100 text-blue-700";
  if (isDanger) badgeClasses = "bg-red-100 text-red-700";
  if (isWarning) badgeClasses = "bg-amber-100 text-amber-700";

  let borderClasses = "border-gray-200 hover:border-red-300";
  if (selected) {
    borderClasses = "border-red-500 bg-red-50/50 shadow-sm shadow-red-100";
  }

  let iconClasses = "text-gray-400 bg-gray-50";
  if (selected) {
    iconClasses = "text-red-600 bg-red-100";
  }

  return (
    <div
      onClick={() => onSelect(id)}
      className={`cursor-pointer border rounded-xl p-5 transition-all duration-200 relative group
        ${borderClasses} hover:-translate-y-0.5`}
      role="radio"
      aria-checked={selected}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-lg shrink-0 transition-colors ${iconClasses}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-slate-900">{title}</h4>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeClasses}`}>
              {badgeText}
            </span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

// --- DeactivationReason ---
const reasons = [
  { id: "govt_transfer", label: "Government Service Transfer", icon: Building },
  { id: "role_change", label: "Change of Role or Responsibility", icon: Briefcase },
  { id: "retirement", label: "Retirement", icon: UserRoundX },
  { id: "extended_leave", label: "Extended Leave / Temporary Unavailability", icon: CalendarOff },
  { id: "not_required", label: "Account No Longer Required", icon: FileWarning },
  { id: "other", label: "Other", icon: MoreHorizontal },
];

function DeactivationReason({ selectedReason, onSelectReason, otherDescription, onChangeOtherDescription }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {reasons.map((reason) => {
          const isSelected = selectedReason === reason.id;
          const Icon = reason.icon;
          return (
            <div
              key={reason.id}
              onClick={() => onSelectReason(reason.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                isSelected 
                  ? "border-blue-500 bg-blue-50/50 shadow-sm shadow-blue-100" 
                  : "border-gray-200 hover:border-blue-200 bg-white"
              }`}
            >
              <div className={`p-2 rounded-lg ${isSelected ? "bg-blue-100 text-blue-600" : "bg-gray-50 text-gray-500"}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-sm font-medium ${isSelected ? "text-blue-900" : "text-slate-700"}`}>
                {reason.label}
              </span>
            </div>
          );
        })}
      </div>

      {selectedReason === "other" && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <label htmlFor="other-reason" className="block text-sm font-medium text-slate-700 mb-1">
            Reason Description <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <textarea
              id="other-reason"
              value={otherDescription}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  onChangeOtherDescription(e.target.value);
                }
              }}
              placeholder="Please provide a brief reason..."
              className={`w-full p-3 border rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white ${
                otherDescription.length === 0 ? "border-red-300" : "border-gray-200"
              }`}
              rows={3}
            />
            <div className="absolute bottom-3 right-3 text-xs text-slate-400 font-medium">
              {otherDescription.length} / 500
            </div>
          </div>
          {otherDescription.length === 0 && (
            <p className="text-red-500 text-xs mt-1">Please provide a reason description.</p>
          )}
        </div>
      )}
    </div>
  );
}

// --- ActiveWorkSummary ---
function ActiveWorkSummary() {
  const stats = [
    { label: "Active Investigations", value: 4, icon: Search, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Assigned Cases", value: 3, icon: Folder, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Pending Work", value: 2, icon: FileText, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Pending Approvals", value: 1, icon: ClipboardCheck, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Unsubmitted Reports", value: 2, icon: FileText, color: "text-red-600", bg: "bg-red-50" },
    { label: "Assigned Evidence Tasks", value: 5, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-5">
      <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-center gap-3 text-sm">
        <span className="text-xl">⚠️</span>
        <p className="font-medium">You currently have 4 active investigations and 2 pending work items.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col hover:border-gray-300 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-2xl font-semibold text-slate-800">{stat.value}</span>
              </div>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</span>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h5 className="text-sm font-semibold text-slate-800 mb-1">Download Work Details</h5>
          <p className="text-xs text-slate-500 max-w-md leading-relaxed">
            Download an authorized summary of your current work and assignments. Information available for download is subject to Role & Permissions and organizational policy.
          </p>
        </div>
        <button className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:text-slate-900 transition-colors shadow-sm">
          <Download className="w-4 h-4 text-slate-500" />
          Download Summary
        </button>
      </div>
    </div>
  );
}

// --- SecurityVerification ---
function SecurityVerification({ securityState, onSecurityChange }) {
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [twoFaInput, setTwoFaInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [mobileInput, setMobileInput] = useState("");
  const [confirmationInput, setConfirmationInput] = useState("");

  const handleVerifyPassword = () => {
    if (!passwordInput) return;
    onSecurityChange({ ...securityState, passwordStatus: "verifying" });
    setTimeout(() => {
      onSecurityChange({ ...securityState, passwordStatus: "verified" });
    }, 800);
  };

  const handleVerify2FA = () => {
    if (twoFaInput.length < 6) return;
    onSecurityChange({ ...securityState, twoFaStatus: "verifying" });
    setTimeout(() => {
      onSecurityChange({ ...securityState, twoFaStatus: "verified" });
    }, 800);
  };

  const handleVerifyEmail = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) return;
    onSecurityChange({ ...securityState, emailStatus: "verifying" });
    setTimeout(() => {
      onSecurityChange({ ...securityState, emailStatus: "verified" });
    }, 800);
  };

  const handleVerifyMobile = () => {
    if (!/^\d{10}$/.test(mobileInput)) return;
    onSecurityChange({ ...securityState, mobileStatus: "verifying" });
    setTimeout(() => {
      onSecurityChange({ ...securityState, mobileStatus: "verified" });
    }, 800);
  };

  const handleVerifyConfirmation = () => {
    if (confirmationInput.length < 6) return;
    onSecurityChange({ ...securityState, confirmationStatus: "verifying" });
    setTimeout(() => {
      onSecurityChange({ ...securityState, confirmationStatus: "verified" });
    }, 800);
  };

  const isStep1Verified = securityState.passwordStatus === "verified";
  const isStep2Verified = isStep1Verified && (!securityState.is2FAEnabled || securityState.twoFaStatus === "verified");
  const isStep3Verified = isStep2Verified && securityState.emailStatus === "verified" && securityState.mobileStatus === "verified";
  const isStep4Verified = isStep3Verified && securityState.confirmationStatus === "verified";

  return (
    <div className="space-y-8">
      {/* Step 1: Password */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Step 1 — Password Verification</h4>
        {securityState.passwordStatus === "verified" ? (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg border border-green-200">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium text-sm">Password Verified</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                  placeholder="Enter password"
                  disabled={securityState.passwordStatus === "verifying"}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleVerifyPassword}
                disabled={!passwordInput || securityState.passwordStatus === "verifying"}
                className="w-full md:w-auto px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {securityState.passwordStatus === "verifying" && <Loader2 className="w-4 h-4 animate-spin" />}
                Verify Password
              </button>
            </div>
          </div>
        )}
      </div>

      <hr className="border-gray-100" />
      
      {/* Step 2: 2FA */}
      <div className={`space-y-4 ${!isStep1Verified ? 'opacity-50 pointer-events-none select-none grayscale' : ''}`}>
        <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Step 2 — Two-Factor Authentication</h4>
        {securityState.is2FAEnabled ? (
          securityState.twoFaStatus === "verified" ? (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg border border-green-200">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium text-sm">2FA Verified</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Authentication Code</label>
                <input
                  type="text"
                  maxLength={6}
                  value={twoFaInput}
                  onChange={(e) => setTwoFaInput(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white tracking-widest font-mono"
                  placeholder="000000"
                  disabled={securityState.twoFaStatus === "verifying"}
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleVerify2FA}
                  disabled={twoFaInput.length !== 6 || securityState.twoFaStatus === "verifying"}
                  className="w-full md:w-auto px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {securityState.twoFaStatus === "verifying" && <Loader2 className="w-4 h-4 animate-spin" />}
                  Verify Code
                </button>
              </div>
            </div>
          )
        ) : (
          <p className="text-sm text-slate-500 italic bg-slate-50 p-3 rounded-lg border border-slate-100">
            Two-factor authentication is currently disabled for this account.
          </p>
        )}
      </div>

      <hr className="border-gray-100" />
      
      {/* Step 3: Identity Verification */}
      <div className={`space-y-4 ${!isStep2Verified ? 'opacity-50 pointer-events-none select-none grayscale' : ''}`}>
        <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Step 3 — Identity Verification</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email Verification */}
          <div className="p-4 border border-gray-200 rounded-xl bg-white space-y-3">
            <p className="text-xs font-medium text-slate-500">Registered Email</p>
            {securityState.emailStatus === "verified" ? (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-medium text-sm">Verified</span>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter email address"
                  disabled={securityState.emailStatus === "verifying"}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                />
                <button
                  onClick={handleVerifyEmail}
                  disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput) || securityState.emailStatus === "verifying"}
                  className="w-full px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {securityState.emailStatus === "verifying" && <Loader2 className="w-4 h-4 animate-spin" />}
                  Verify Email
                </button>
              </div>
            )}
          </div>

          {/* Mobile Verification */}
          <div className="p-4 border border-gray-200 rounded-xl bg-white space-y-3">
            <p className="text-xs font-medium text-slate-500">Registered Mobile (10 digits)</p>
            {securityState.mobileStatus === "verified" ? (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-medium text-sm">Verified</span>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  maxLength={10}
                  value={mobileInput}
                  onChange={(e) => setMobileInput(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 10 digit mobile number"
                  disabled={securityState.mobileStatus === "verifying"}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white tracking-widest"
                />
                <button
                  onClick={handleVerifyMobile}
                  disabled={mobileInput.length !== 10 || securityState.mobileStatus === "verifying"}
                  className="w-full px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {securityState.mobileStatus === "verifying" && <Loader2 className="w-4 h-4 animate-spin" />}
                  Verify Mobile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />
      
      {/* Step 4: Confirmation Code */}
      <div className={`space-y-4 ${!isStep3Verified ? 'opacity-50 pointer-events-none select-none grayscale' : ''}`}>
        <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Step 4 — Deactivation Confirmation Code</h4>
        <p className="text-xs text-slate-500">
          Enter the confirmation code sent to your registered verification channel.
        </p>
        {securityState.confirmationStatus === "verified" ? (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg border border-green-200">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium text-sm">Confirmation Code Verified</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                maxLength={6}
                value={confirmationInput}
                onChange={(e) => setConfirmationInput(e.target.value.replace(/\D/g, ""))}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white tracking-widest font-mono"
                placeholder="000000"
                disabled={securityState.confirmationStatus === "verifying"}
              />
            </div>
            <div className="flex items-start">
              <button
                onClick={handleVerifyConfirmation}
                disabled={confirmationInput.length !== 6 || securityState.confirmationStatus === "verifying"}
                className="w-full md:w-auto px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {securityState.confirmationStatus === "verifying" && <Loader2 className="w-4 h-4 animate-spin" />}
                Verify Code
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Step 5: Final Checkbox */}
      <div className={`mt-8 ${!isStep4Verified ? 'opacity-50 pointer-events-none select-none grayscale' : ''}`}>
          <label className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
          securityState.agreedToTerms 
            ? "bg-red-50/50 border-red-200" 
            : "bg-red-50/30 border-red-100 hover:bg-red-50/50"
        }`}>
          <div className="pt-0.5">
            <input
              type="checkbox"
              checked={securityState.agreedToTerms}
              onChange={(e) => onSecurityChange({ ...securityState, agreedToTerms: e.target.checked })}
              className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500 focus:ring-2 cursor-pointer mt-0.5"
            />
          </div>
          <div>
            <span className="text-sm font-medium text-red-900 block mb-1">
              Security Confirmation
            </span>
            <span className="text-xs text-red-700/80 leading-relaxed block">
              I understand that my NEXORA account access will be deactivated and applicable investigation, audit, and organizational records will be retained according to policy.
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}

// --- DeleteAccount Main Component ---
export default function DeleteAccount({ onBack }) {
  const [deactivationType, setDeactivationType] = useState("");
  const [reason, setReason] = useState("");
  const [otherDescription, setOtherDescription] = useState("");
  const [securityState, setSecurityState] = useState({
    passwordStatus: "not_verified",
    is2FAEnabled: true,
    twoFaStatus: "not_verified",
    emailStatus: "not_verified",
    mobileStatus: "not_verified",
    confirmationStatus: "not_verified",
    agreedToTerms: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleCancel = () => {
    setDeactivationType("");
    setReason("");
    setOtherDescription("");
    setSecurityState({
      passwordStatus: "not_verified",
      is2FAEnabled: true,
      twoFaStatus: "not_verified",
      emailStatus: "not_verified",
      mobileStatus: "not_verified",
      confirmationStatus: "not_verified",
      agreedToTerms: false,
    });
    setResetKey(prev => prev + 1);
    setIsSuccess(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isFormValid = () => {
    if (!deactivationType) return false;
    if (!reason) return false;
    if (reason === "other" && otherDescription.trim().length === 0) return false;
    if (securityState.passwordStatus !== "verified") return false;
    if (securityState.is2FAEnabled && securityState.twoFaStatus !== "verified") return false;
    if (securityState.emailStatus !== "verified") return false;
    if (securityState.mobileStatus !== "verified") return false;
    if (securityState.confirmationStatus !== "verified") return false;
    if (!securityState.agreedToTerms) return false;
    return true;
  };

  const handleDeactivateClick = () => {
    if (isFormValid()) {
      setShowModal(true);
    }
  };

  const confirmDeactivation = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowModal(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div 
        className="min-h-screen bg-transparent flex items-center justify-center p-4"
        style={{
          '--color-primary': '#2563EB',
          '--color-primary-dark': '#1D4ED8',
          '--color-navbar': '#0F2B5B',
          '--color-accent': '#3B82F6',
          '--color-light-blue': '#DBEAFE',
          '--color-page-bg': '#F8FAFC',
          '--color-card': '#FFFFFF',
          '--color-section-bg': '#F1F5F9',
          '--color-heading': '#0F172A',
          '--color-body': '#475569',
          '--color-secondary': '#64748B',
          '--color-muted': '#94A3B8',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Account Deactivation Request Submitted</h2>
          <p className="text-slate-500 text-sm mb-8">
            Your account deactivation request has been successfully submitted and is now pending processing.
          </p>
          
          <div className="bg-slate-50 rounded-xl p-4 mb-8 text-left space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Request ID</span>
              <span className="font-semibold text-slate-800">REQ-2026-X89A</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Deactivation Type</span>
              <span className="font-semibold text-slate-800 capitalize">
                {deactivationType.replace("_", " ")}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Status</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-semibold">Under Review</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Submitted On</span>
              <span className="font-semibold text-slate-800">10 Aug 2026, 04:42 PM</span>
            </div>
          </div>

          <button 
            onClick={handleCancel}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            Return to Account Settings
          </button>
        </div>
      </div>
    );
  }

  const isDangerAction = deactivationType === "permanent" || deactivationType === "closure";

  return (
    <div 
      className="min-h-screen bg-transparent font-sans text-slate-800 relative"
      style={{
        '--color-primary': '#2563EB',
        '--color-primary-dark': '#1D4ED8',
        '--color-navbar': '#0F2B5B',
        '--color-accent': '#3B82F6',
        '--color-light-blue': '#DBEAFE',
        '--color-page-bg': '#F8FAFC',
        '--color-card': '#FFFFFF',
        '--color-section-bg': '#F1F5F9',
        '--color-heading': '#0F172A',
        '--color-body': '#475569',
        '--color-secondary': '#64748B',
        '--color-muted': '#94A3B8',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {onBack && (
        <button onClick={onBack}
          className="absolute top-1.5 left-3 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
        >
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Back</span>
        </button>
      )}
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pt-16">
        
        {/* Page Heading */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[24px] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-6 py-5 mb-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-[#0F2B5B] mb-1 tracking-tight">Delete Account</h1>
            <p className="text-[13px] font-medium text-[#64748B]">
              Manage account deactivation, security verification and account closure
            </p>
          </div>
          
          {/* Top Right Status */}
          <div className="flex items-center gap-2 bg-green-50/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-green-100/50 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-emerald-900 leading-none mb-0.5">Your account is secure</span>
              <span className="text-[10px] text-emerald-600/80 leading-none">Last checked: 2 min ago</span>
            </div>
          </div>
        </div>
        
        {/* Section 1: Account Deactivation */}
        <section className="bg-white/70 backdrop-blur-xl rounded-[24px] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 pt-6 pb-2">
            <h2 className="text-[15px] font-bold text-[#0F2B5B] flex items-center gap-2">
              <span className="bg-[#EBF3FF] text-[#2563EB] w-5 h-5 rounded-[6px] flex items-center justify-center text-[11px]">1</span>
              Account Deactivation
            </h2>
          </div>
          <div className="px-6 pb-6 pt-2">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <DeactivationTypeCard
                id="temporary"
                title="Temporary Deactivation"
                description="Account will be temporarily inactive. Login access will be disabled. Account data will be preserved. Reactivation is possible upon authorized approval."
                icon={PowerOff}
                badgeText="Reversible"
                badgeType="primary"
                selected={deactivationType === "temporary"}
                onSelect={setDeactivationType}
              />
              <DeactivationTypeCard
                id="permanent"
                title="Permanent Deactivation"
                description="Account will be permanently inactive. Login access will be permanently disabled. Account-related data will be retained or restricted according to applicable policy."
                icon={ShieldAlert}
                badgeText="Permanent"
                badgeType="warning"
                selected={deactivationType === "permanent"}
                onSelect={setDeactivationType}
              />
              <DeactivationTypeCard
                id="closure"
                title="Account Closure"
                description="Account closure request will be submitted. The organization or authorized authority will review it. Applicable data-retention policies will be followed."
                icon={LockKeyhole}
                badgeText="Requires Review"
                badgeType="danger"
                selected={deactivationType === "closure"}
                onSelect={setDeactivationType}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Deactivation Reason */}
        <section className="bg-white/70 backdrop-blur-xl rounded-[24px] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 pt-6 pb-2">
            <h2 className="text-[15px] font-bold text-[#0F2B5B] flex items-center gap-2">
              <span className="bg-[#EBF3FF] text-[#2563EB] w-5 h-5 rounded-[6px] flex items-center justify-center text-[11px]">2</span>
              Deactivation Reason
            </h2>
          </div>
          <div className="px-6 pb-6 pt-2">
            <DeactivationReason 
              selectedReason={reason} 
              onSelectReason={setReason}
              otherDescription={otherDescription}
              onChangeOtherDescription={setOtherDescription}
            />
          </div>
        </section>

        {/* Section 3: Active Work & Cases */}
        <section className="bg-white/70 backdrop-blur-xl rounded-[24px] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 pt-6 pb-2">
            <h2 className="text-[15px] font-bold text-[#0F2B5B] flex items-center gap-2">
              <span className="bg-[#EBF3FF] text-[#2563EB] w-5 h-5 rounded-[6px] flex items-center justify-center text-[11px]">3</span>
              Active Work & Cases
            </h2>
          </div>
          <div className="px-6 pb-6 pt-2">
            <ActiveWorkSummary />
          </div>
        </section>

        {/* Section 4: Security Verification */}
        <section className="bg-white/70 backdrop-blur-xl rounded-[24px] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 pt-6 pb-2">
            <h2 className="text-[15px] font-bold text-[#0F2B5B] flex items-center gap-2">
              <span className="bg-[#EBF3FF] text-[#2563EB] w-5 h-5 rounded-[6px] flex items-center justify-center text-[11px]">4</span>
              Security Verification
            </h2>
          </div>
          <div className="px-6 pb-6 pt-2">
            <SecurityVerification 
              key={resetKey}
              securityState={securityState}
              onSecurityChange={setSecurityState}
            />
          </div>
        </section>

        {/* Action Buttons */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[24px] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-6 py-4 flex items-center justify-between mt-2">
          <button 
            onClick={handleCancel}
            className="px-6 py-2.5 bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 hidden md:inline-block">
              {isFormValid() ? "Ready to deactivate" : "Complete all steps to continue"}
            </span>
            <button
              onClick={handleDeactivateClick}
              disabled={!isFormValid()}
              className={`px-8 py-2.5 text-white font-medium rounded-xl transition-all shadow-sm ${
                !isFormValid() 
                  ? "bg-slate-300 cursor-not-allowed opacity-70"
                  : isDangerAction
                    ? "bg-red-600 hover:bg-red-700 hover:shadow-red-500/20 shadow-lg"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/20 shadow-lg"
              }`}
            >
              Review Deactivation
            </button>
          </div>
        </div>

      </main>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-lg overflow-hidden relative z-10 animate-in zoom-in-95 duration-200">
            <div className={`px-6 py-5 border-b ${isDangerAction ? "bg-red-50 border-red-100" : "bg-blue-50 border-blue-100"}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isDangerAction ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Confirm Account Deactivation</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-2 text-sm border-b pb-4">
                <span className="text-slate-500 col-span-1">Deactivation Type:</span>
                <span className="font-semibold text-slate-900 col-span-2 capitalize">
                  {deactivationType.replace("_", " ")}
                </span>
                
                <span className="text-slate-500 col-span-1">Reason:</span>
                <span className="font-semibold text-slate-900 col-span-2 capitalize">
                  {reason === "other" ? "Other" : reason.replace("_", " ")}
                </span>
              </div>

              <div>
                <span className="text-sm text-slate-500 mb-2 block">Security Checks Passed:</span>
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle2 className="w-4 h-4" /> Password Verified
                  </div>
                  {securityState.is2FAEnabled && (
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle2 className="w-4 h-4" /> 2FA Verified
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle2 className="w-4 h-4" /> Email Verified
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle2 className="w-4 h-4" /> Mobile Verified
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle2 className="w-4 h-4" /> Confirmation Code Verified
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-sm leading-relaxed mt-4">
                <strong>Warning:</strong> This action will deactivate your NEXORA account access. Applicable investigation, audit and organizational records may be retained according to organizational policy.
              </div>
            </div>

            <div className="p-4 border-t bg-slate-50 flex items-center justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)}
                disabled={isSubmitting}
                className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeactivation}
                disabled={isSubmitting}
                className={`px-5 py-2.5 text-white font-medium rounded-xl transition-all shadow-sm flex items-center gap-2 ${
                  isDangerAction 
                    ? "bg-red-600 hover:bg-red-700" 
                    : "bg-blue-600 hover:bg-blue-700"
                } disabled:opacity-50`}
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                Confirm Deactivation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
