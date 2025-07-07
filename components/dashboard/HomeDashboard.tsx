import React from 'react';
import { ReactNode } from 'react';
import { View } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { SparklesIcon, LightBulbIcon, CheckCircleIcon, ArrowTrendingUpIcon, UsersIcon, PuzzlePieceIcon, ArrowPathIcon, MapPinIcon, TrendingUpIcon } from '../../constants';
import RealTimeDonationTracker from './RealTimeDonationTracker';
import AIDailyBriefing from './AIDailyBriefing';
import QuickActionsBar from './QuickActionsBar';
import HotLeadsSection from './HotLeadsSection';

interface HomeDashboardProps {
  setView: (view: View) => void;
  setProfileId: (id: string) => void;
}

const ActionTile: React.FC<{ title: string; subtitle: ReactNode; cta: string; icon: ReactNode; onClick?: () => void; }> = ({ title, subtitle, cta, icon, onClick }) => (
  <Card className="flex flex-col" onClick={onClick}>
    <div className="flex-grow">
      <div className="flex items-start gap-4">
        <div className="text-crimson-blue bg-crimson-blue/10 p-3 rounded-lg">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-base text-text-primary">{title}</h4>
          <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
    <div className="mt-4">
      <Button variant="secondary" size="sm" className="w-full">{cta}</Button>
    </div>
  </Card>
);

const QuickStat: React.FC<{ label: string; value: string; }> = ({ label, value }) => (
    <div className="bg-white p-2 rounded-lg border border-gray-100">
        <p className="text-xs text-text-secondary font-medium">{label}</p>
        <p className="text-lg font-bold text-text-primary mt-0.5">{value}</p>
    </div>
);

const HomeDashboard: React.FC<HomeDashboardProps> = ({ setView, setProfileId }) => {
  const handleViewProfile = () => {
    setProfileId('joseph-banks');
    setView('profile');
  };

  const handleCleanData = () => {
    setView('compliance');
  }

  return (
    <div className="space-y-4">
      {/* Compact Quick Stats Header */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 p-2.5 bg-gray-50 rounded-lg border border-gray-200">
        <QuickStat label="Total Donors" value="199,138" />
        <QuickStat label="Pledges Outstanding" value="$220,510" />
        <QuickStat label="Average Gift" value="$87.50" />
        <QuickStat label="% Active Voters" value="78%" />
        <QuickStat label="% Missing Contact" value="12%" />
      </div>

      {/* Hero Section - Real-Time Donation Tracker */}
      <RealTimeDonationTracker />

      {/* AI Daily Briefing - Enhanced with Quick Wins */}
      <AIDailyBriefing />

      {/* Collapsible Quick Actions Bar */}
      <QuickActionsBar />

      {/* Main Content - Focused on Hot Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          {/* Hot Leads Section - Primary Focus */}
          <HotLeadsSection />
        </div>

        <div className="lg:col-span-1">
          {/* AI Curated Segments - Professional */}
          <Card title="AI Curated Segments">
            <div className="space-y-2">
              <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 bg-blue-100 rounded">
                    <ArrowPathIcon className="w-3 h-3 text-blue-600" />
                  </div>
                  <h5 className="font-semibold text-sm text-gray-900">Comeback Crew</h5>
                </div>
                <p className="text-xs text-gray-600 mb-2">1,571 donors • ~$113,000 potential</p>
                <div className="flex gap-1">
                  <Button variant="secondary" size="sm" className="flex-1 text-xs py-1">View</Button>
                  <Button variant="secondary" size="sm" className="flex-1 text-xs py-1">Campaign</Button>
                </div>
              </div>
              <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 bg-green-100 rounded">
                    <MapPinIcon className="w-3 h-3 text-green-600" />
                  </div>
                  <h5 className="font-semibold text-sm text-gray-900">Neighborhood MVPs</h5>
                </div>
                <p className="text-xs text-gray-600 mb-2">303 donors • ~$104,000 potential</p>
                <div className="flex gap-1">
                  <Button variant="secondary" size="sm" className="flex-1 text-xs py-1">View</Button>
                  <Button variant="secondary" size="sm" className="flex-1 text-xs py-1">Campaign</Button>
                </div>
              </div>
              <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 bg-purple-100 rounded">
                    <TrendingUpIcon className="w-3 h-3 text-purple-600" />
                  </div>
                  <h5 className="font-semibold text-sm text-gray-900">Level-Up List</h5>
                </div>
                <p className="text-xs text-gray-600 mb-2">578 donors • ~$21,300 potential</p>
                <div className="flex gap-1">
                  <Button variant="secondary" size="sm" className="flex-1 text-xs py-1">View</Button>
                  <Button variant="secondary" size="sm" className="flex-1 text-xs py-1">Campaign</Button>
                </div>
              </div>
              <Button variant="secondary" className="w-full mt-2 text-sm py-2" onClick={() => setView('fundraising')}>
                View All 8 Segments →
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* More Tools - Streamlined */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <PuzzlePieceIcon className="w-5 h-5 text-crimson-blue" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">More AI Tools</h4>
              <p className="text-sm text-gray-600">Advanced segments, data cleaning & analytics</p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setView('fundraising')}
            className="px-4"
          >
            Explore →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
