/**
 * @file src/page/LegalPdfIntelligence/TeamAndBusiness/TeamAndBusinessPage.jsx
 * @description Main Team & Business container rendering 33 tools cards and sub-page routing.
 */
import React, { useState } from 'react';
import {
  ArrowLeft,
  Users,
  Globe,
  Key,
  Layers,
  Sparkles,
  Headphones,
  Zap,
  HardDrive,
  ShieldCheck,
  UserCheck,
  Share2,
  Briefcase,
  MessageSquare,
  Tag,
  CheckCircle,
  Activity,
  FileCheck,
  Clock,
  RotateCcw,
  FileDiff,
  Lock,
  FileText,
  Cloud,
  Database,
  Sliders,
  CreditCard,
  Palette
} from 'lucide-react';
import ToolCard from '../../../components/nexora';

import TeamManagementPage from './TeamManagement/TeamManagementPage';
import RegionalFileProcessingPage from './RegionalFileProcessing/RegionalFileProcessingPage';
import SingleSignOnSsoPage from './SingleSignOnSso/SingleSignOnSsoPage';
import BatchProcessingPage from './BatchProcessing/BatchProcessingPage';
import AiCreditsPage from './AiCredits/AiCreditsPage';
import PrioritySupportPage from './PrioritySupport/PrioritySupportPage';
import UnlimitedDocumentProcessingPremiumPage from './UnlimitedDocumentProcessingPremium/UnlimitedDocumentProcessingPremiumPage';
import UnlimitedFileSizePremiumPage from './UnlimitedFileSizePremium/UnlimitedFileSizePremiumPage';
import AdFreeWorkspacePremiumPage from './AdFreeWorkspacePremium/AdFreeWorkspacePremiumPage';
import DedicatedAccountManagerBusinessPlanPage from './DedicatedAccountManagerBusinessPlan/DedicatedAccountManagerBusinessPlanPage';
import RealTimeCollaborationPage from './RealTimeCollaboration/RealTimeCollaborationPage';
import SharedWorkspacePage from './SharedWorkspace/SharedWorkspacePage';
import SharedCommentsPage from './SharedComments/SharedCommentsPage';
import AnnotationSharingPage from './AnnotationSharing/AnnotationSharingPage';
import ReplyToCommentsPage from './ReplyToComments/ReplyToCommentsPage';
import ResolveCommentsPage from './ResolveComments/ResolveCommentsPage';
import ReviewTrackingPage from './ReviewTracking/ReviewTrackingPage';
import ApprovalRequestsPage from './ApprovalRequests/ApprovalRequestsPage';
import ApprovalStatusTrackingPage from './ApprovalStatusTracking/ApprovalStatusTrackingPage';
import RestorePreviousVersionsPage from './RestorePreviousVersions/RestorePreviousVersionsPage';
import CompareVersionsPage from './CompareVersions/CompareVersionsPage';
import TeamPermissionsPage from './TeamPermissions/TeamPermissionsPage';
import Microsoft365IntegrationPage from './Microsoft365Integration/Microsoft365IntegrationPage';
import GoogleWorkspaceIntegrationPage from './GoogleWorkspaceIntegration/GoogleWorkspaceIntegrationPage';
import OnedriveForBusinessPage from './OnedriveForBusiness/OnedriveForBusinessPage';
import SalesforceIntegrationPage from './SalesforceIntegration/SalesforceIntegrationPage';
import EnterpriseCloudIntegrationPage from './EnterpriseCloudIntegration/EnterpriseCloudIntegrationPage';
import ScimUserProvisioningPage from './ScimUserProvisioning/ScimUserProvisioningPage';
import SystemManagementPage from './SystemManagement/SystemManagementPage';
import SubscriptionManagementPage from './SubscriptionManagement/SubscriptionManagementPage';
import AuditLogsAndActivityMonitoringPage from './AuditLogsAndActivityMonitoring/AuditLogsAndActivityMonitoringPage';
import CustomBrandingWhiteLabelPage from './CustomBrandingWhiteLabel/CustomBrandingWhiteLabelPage';

const card = (id, name, desc, Icon, color, bg) => ({
  id,
  name,
  desc,
  icon: (props) => <Icon {...props} />,
  color,
  bg,
  parentId: 'TEAM_BUSINESS',
  fullName: name
});

export const TEAM_BUSINESS_CARDS = [
  card('team-management', 'Team Management', 'Manage members, roles, and administrative access controls across your organization.', Users, 'text-purple-600', 'bg-purple-100'),
  card('regional-file-processing', 'Regional File Processing', 'Process and store documents in localized data centers for strict data compliance.', Globe, 'text-sky-600', 'bg-sky-100'),
  card('single-sign-on-sso', 'Single Sign-On (SSO)', 'Authenticate seamlessly using enterprise SAML 2.0, Okta, Azure AD, or OAuth.', Key, 'text-violet-600', 'bg-violet-100'),
  card('batch-processing', 'Batch Processing', 'Execute automated actions on hundreds of PDF files simultaneously in seconds.', Layers, 'text-rose-600', 'bg-rose-100'),

  card('ai-credits', 'AI Credits', 'Flexible credit allocation for high-volume document summarization and insights.', Sparkles, 'text-amber-600', 'bg-amber-100'),
  card('priority-support', 'Priority Support', '24/7 direct access to dedicated technical support engineers with fast SLA responses.', Headphones, 'text-emerald-600', 'bg-emerald-100'),
  card('unlimited-document-processing-premium', 'Unlimited Document Processing (Premium)', 'Process unlimited files without daily limits or volume constraints.', Zap, 'text-indigo-600', 'bg-indigo-100'),
  card('unlimited-file-size-premium', 'Unlimited File Size (Premium)', 'Upload and edit massive PDF documents without size or page restrictions.', HardDrive, 'text-amber-600', 'bg-amber-100'),

  card('ad-free-workspace-premium', 'Ad-Free Workspace (Premium)', 'Enjoy a clean, distraction-free environment optimized for maximum team productivity.', ShieldCheck, 'text-purple-600', 'bg-purple-100'),
  card('dedicated-account-manager-business-plan', 'Dedicated Account Manager (Business Plan)', 'Get personalized onboarding, workflow consultations, and enterprise support.', UserCheck, 'text-pink-600', 'bg-pink-100'),
  card('real-time-collaboration', 'Real-time Collaboration', 'Co-edit and review PDF documents live with team members across devices.', Share2, 'text-rose-600', 'bg-rose-100'),
  card('shared-workspace', 'Shared Workspace', 'Centralized cloud repository for organizing team documents, templates, and assets.', Briefcase, 'text-sky-600', 'bg-sky-100'),

  card('shared-comments', 'Shared Comments', 'Collaborative commenting threads with contextual document callouts and tags.', MessageSquare, 'text-violet-600', 'bg-violet-100'),
  card('annotation-sharing', 'Annotation Sharing', 'Share highlights, drawings, callouts, and markup layers instantly with team members.', Tag, 'text-amber-600', 'bg-amber-100'),
  card('reply-to-comments', 'Reply to Comments', 'Engage in structured discussion threads directly inside document pages.', MessageSquare, 'text-orange-600', 'bg-orange-100'),
  card('resolve-comments', 'Resolve Comments', 'Mark discussions as completed to keep document reviews organized and clear.', CheckCircle, 'text-emerald-600', 'bg-emerald-100'),

  card('review-tracking', 'Review Tracking', 'Monitor reader progress, pending sign-offs, and reviewer activity in real time.', Activity, 'text-sky-600', 'bg-sky-100'),
  card('approval-requests', 'Approval Requests', 'Route documents through formal multi-stage approval workflows automatically.', FileCheck, 'text-amber-600', 'bg-amber-100'),
  card('approval-status-tracking', 'Approval Status Tracking', 'Track approval bottlenecks, pending signatures, and timestamped audit milestones.', Clock, 'text-purple-600', 'bg-purple-100'),
  card('restore-previous-versions', 'Restore Previous Versions', 'Revert to any historic revision with complete change history and rollbacks.', RotateCcw, 'text-rose-600', 'bg-rose-100'),

  card('compare-versions', 'Compare Versions', 'Side-by-side visual and text diffing to identify changes between file versions.', FileDiff, 'text-pink-600', 'bg-pink-100'),
  card('team-permissions', 'Team Permissions', 'Granular role-based access control (RBAC) for viewing, editing, and sharing.', Lock, 'text-sky-600', 'bg-sky-100'),
  card('microsoft-365-integration', 'Microsoft 365 Integration', 'Direct integration with Word, Excel, PowerPoint, and Teams document flows.', FileText, 'text-indigo-600', 'bg-indigo-100'),
  card('google-workspace-integration', 'Google Workspace Integration', 'Seamlessly open, edit, and save PDFs directly within Google Drive and Docs.', Cloud, 'text-red-600', 'bg-red-100'),

  card('onedrive-for-business', 'OneDrive for Business', 'Enterprise Microsoft OneDrive file syncing with encrypted cloud backup.', Cloud, 'text-amber-600', 'bg-amber-100'),
  card('salesforce-integration', 'Salesforce Integration', 'Attach, generate, and process PDFs directly within Salesforce CRM records.', Database, 'text-emerald-600', 'bg-emerald-100'),
  card('enterprise-cloud-integration', 'Enterprise Cloud Integration', 'Connect custom AWS S3, Azure Blob, or private S3-compatible cloud storage.', Database, 'text-sky-600', 'bg-sky-100'),
  card('scim-user-provisioning', 'SCIM User Provisioning', 'Automate user onboarding and deprovisioning via standard SCIM 2.0 protocol.', UserCheck, 'text-amber-600', 'bg-amber-100'),

  card('system-management', 'System Management', 'Central administrator dashboard for managing policies, security, and global settings.', Sliders, 'text-purple-600', 'bg-purple-100'),
  card('subscription-management', 'Subscription Management', 'Manage seat licenses, plan upgrades, invoices, and billing contact details.', CreditCard, 'text-pink-600', 'bg-pink-100'),
  card('audit-logs-activity-monitoring', 'Audit Logs & Activity Monitoring', 'Comprehensive security audit logs tracking every file action, download, and login.', ShieldCheck, 'text-red-600', 'bg-red-100'),
  card('custom-branding-white-label', 'Custom Branding (White Label)', 'Apply your company logo, custom domain, and brand colors across all PDF tools.', Palette, 'text-sky-600', 'bg-sky-100')
];

export default function TeamAndBusinessPage({ onBack }) {
  const [activeTool, setActiveTool] = useState(null);

  const renderTool = () => {
    switch (activeTool) {
      case 'team-management':
        return <TeamManagementPage onBack={() => setActiveTool(null)} />;
      case 'regional-file-processing':
        return <RegionalFileProcessingPage onBack={() => setActiveTool(null)} />;
      case 'single-sign-on-sso':
        return <SingleSignOnSsoPage onBack={() => setActiveTool(null)} />;
      case 'batch-processing':
        return <BatchProcessingPage onBack={() => setActiveTool(null)} />;
      case 'ai-credits':
        return <AiCreditsPage onBack={() => setActiveTool(null)} />;
      case 'priority-support':
        return <PrioritySupportPage onBack={() => setActiveTool(null)} />;
      case 'unlimited-document-processing-premium':
        return <UnlimitedDocumentProcessingPremiumPage onBack={() => setActiveTool(null)} />;
      case 'unlimited-file-size-premium':
        return <UnlimitedFileSizePremiumPage onBack={() => setActiveTool(null)} />;
      case 'ad-free-workspace-premium':
        return <AdFreeWorkspacePremiumPage onBack={() => setActiveTool(null)} />;
      case 'dedicated-account-manager-business-plan':
        return <DedicatedAccountManagerBusinessPlanPage onBack={() => setActiveTool(null)} />;
      case 'real-time-collaboration':
        return <RealTimeCollaborationPage onBack={() => setActiveTool(null)} />;
      case 'shared-workspace':
        return <SharedWorkspacePage onBack={() => setActiveTool(null)} />;
      case 'shared-comments':
        return <SharedCommentsPage onBack={() => setActiveTool(null)} />;
      case 'annotation-sharing':
        return <AnnotationSharingPage onBack={() => setActiveTool(null)} />;
      case 'reply-to-comments':
        return <ReplyToCommentsPage onBack={() => setActiveTool(null)} />;
      case 'resolve-comments':
        return <ResolveCommentsPage onBack={() => setActiveTool(null)} />;
      case 'review-tracking':
        return <ReviewTrackingPage onBack={() => setActiveTool(null)} />;
      case 'approval-requests':
        return <ApprovalRequestsPage onBack={() => setActiveTool(null)} />;
      case 'approval-status-tracking':
        return <ApprovalStatusTrackingPage onBack={() => setActiveTool(null)} />;
      case 'restore-previous-versions':
        return <RestorePreviousVersionsPage onBack={() => setActiveTool(null)} />;
      case 'compare-versions':
        return <CompareVersionsPage onBack={() => setActiveTool(null)} />;
      case 'team-permissions':
        return <TeamPermissionsPage onBack={() => setActiveTool(null)} />;
      case 'microsoft-365-integration':
        return <Microsoft365IntegrationPage onBack={() => setActiveTool(null)} />;
      case 'google-workspace-integration':
        return <GoogleWorkspaceIntegrationPage onBack={() => setActiveTool(null)} />;
      case 'onedrive-for-business':
        return <OnedriveForBusinessPage onBack={() => setActiveTool(null)} />;
      case 'salesforce-integration':
        return <SalesforceIntegrationPage onBack={() => setActiveTool(null)} />;
      case 'enterprise-cloud-integration':
        return <EnterpriseCloudIntegrationPage onBack={() => setActiveTool(null)} />;
      case 'scim-user-provisioning':
        return <ScimUserProvisioningPage onBack={() => setActiveTool(null)} />;
      case 'system-management':
        return <SystemManagementPage onBack={() => setActiveTool(null)} />;
      case 'subscription-management':
        return <SubscriptionManagementPage onBack={() => setActiveTool(null)} />;
      case 'audit-logs-activity-monitoring':
        return <AuditLogsAndActivityMonitoringPage onBack={() => setActiveTool(null)} />;
      case 'custom-branding-white-label':
        return <CustomBrandingWhiteLabelPage onBack={() => setActiveTool(null)} />;
      default:
        return null;
    }
  };

  if (activeTool) {
    return renderTool();
  }

  return (
    <section aria-labelledby="team-business-title" className="flex flex-col gap-6 sm:gap-7">
      <header className="relative pb-2 sm:pb-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#1e2a52] shadow-sm transition hover:bg-slate-50 hover:shadow-md md:absolute md:left-0 md:top-0"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        )}
        <div className="mt-7 text-center md:mt-0 md:px-28">
          <h1 id="team-business-title" className="text-3xl font-black leading-tight tracking-tight text-[#1e2a52] sm:text-4xl lg:text-5xl">
            Team & Business
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-slate-700 sm:text-base">
            Collaborate with team members, manage enterprise documents, and streamline workflows.
          </p>
        </div>
      </header>

      {/* 33 Team & Business Tool Cards Grid (Same as Organize PDF) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
        {TEAM_BUSINESS_CARDS.map((tool, index) => (
          <ToolCard
            key={`${tool.id}-${index}`}
            tool={tool}
            index={index}
            onClick={() => setActiveTool(tool.id)}
            disableCssAnimation={true}
          />
        ))}
      </div>
    </section>
  );
}
