import React from 'react';
import { ReactNode } from 'react';
import { View } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { SparklesIcon, LightBulbIcon, CheckCircleIcon, ArrowTrendingUpIcon, UsersIcon, PuzzlePieceIcon, ArrowPathIcon, MapPinIcon, TrendingUpIcon, MagnifyingGlassIcon } from '../../constants';
import RealTimeDonationTracker from './RealTimeDonationTracker';
import AIDailyBriefing from './AIDailyBriefing';
import QuickActionsBar from './QuickActionsBar';
import HotLeadsSection from './HotLeadsSection';
import SearchModal from '../search/SearchModal';
import { useSearch } from '../../hooks/useSearch';

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

const QuickStat: React.FC<{
  label: string;
  value: string;
  onClick?: () => void;
  cardType?: string;
}> = ({ label, value, onClick, cardType }) => (
    <div
      className={`bg-white p-2 rounded-lg border border-gray-100 transition-all ${
        onClick ? 'cursor-pointer hover:shadow-md hover:border-crimson-blue group' : ''
      }`}
      onClick={onClick}
    >
        <p className={`text-xs font-medium ${
          onClick ? 'text-text-secondary group-hover:text-crimson-blue' : 'text-text-secondary'
        } transition-colors`}>
          {label}
        </p>
        <p className={`text-lg font-bold mt-0.5 ${
          onClick ? 'text-text-primary group-hover:text-crimson-blue' : 'text-text-primary'
        } transition-colors`}>
          {value}
        </p>
        {onClick && (
          <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center text-xs text-crimson-blue">
              <MagnifyingGlassIcon className="w-3 h-3 mr-1" />
              Click to search
            </div>
          </div>
        )}
    </div>
);

const HomeDashboard: React.FC<HomeDashboardProps> = ({ setView, setProfileId }) => {
  const { isSearchOpen, searchConfig, closeSearch, searchFromCard } = useSearch();

  const handleViewProfile = () => {
    setProfileId('joseph-banks');
    setView('profile');
  };

  const handleCleanData = () => {
    setView('compliance');
  }

  // Search handlers for quick stats
  const handleTotalDonorsClick = () => {
    searchFromCard('donors-only', { count: 199138 });
  };

  const handlePledgesClick = () => {
    searchFromCard('pledges-outstanding', { amount: 220510 });
  };

  const handleActiveVotersClick = () => {
    searchFromCard('active-voters', { count: 78, percentage: true });
  };

  const handleMissingContactClick = () => {
    searchFromCard('missing-contact', { count: 12, percentage: true });
  };

  return (
    <div className="space-y-3">
      {/* Compact Quick Stats Header */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
        <QuickStat
          label="Total Donors"
          value="199,138"
          onClick={handleTotalDonorsClick}
          cardType="donors-only"
        />
        <QuickStat
          label="Pledges Outstanding"
          value="$220,510"
          onClick={handlePledgesClick}
          cardType="pledges-outstanding"
        />
        <QuickStat
          label="Average Gift"
          value="$87.50"
        />
        <QuickStat
          label="% Active Voters"
          value="78%"
          onClick={handleActiveVotersClick}
          cardType="active-voters"
        />
        <QuickStat
          label="% Missing Contact"
          value="12%"
          onClick={handleMissingContactClick}
          cardType="missing-contact"
        />
      </div>

      {/* Compact Real-Time Donation Tracker */}
      <RealTimeDonationTracker />

      {/* Enhanced Quick Actions Bar - Always Visible */}
      <QuickActionsBar />

      {/* Three-Column Layout for Better Space Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Column 1: AI Daily Briefing */}
        <div className="lg:col-span-1">
          <AIDailyBriefing setView={setView} setProfileId={setProfileId} />
        </div>

        {/* Column 2: Hot Leads Section */}
        <div className="lg:col-span-1">
          <HotLeadsSection />
        </div>

        {/* Column 3: AI Curated Segments */}
        <div className="lg:col-span-1">
          <Card title="AI Curated Segments">
            <div className="space-y-1.5">
              <div
                className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group"
                onClick={() => searchFromCard('ai-segment', { count: 1571, segmentId: 'comeback-crew' })}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-blue-100 rounded group-hover:bg-blue-200 transition-colors">
                    <ArrowPathIcon className="w-3 h-3 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs text-gray-900 group-hover:text-blue-900">Comeback Crew</h5>
                    <p className="text-xs text-gray-600">1,571 • $113K potential</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <MagnifyingGlassIcon className="w-3 h-3 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Button variant="secondary" size="sm" className="text-xs px-2 py-1">View</Button>
                </div>
              </div>
              <div
                className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100 hover:bg-green-50 hover:border-green-200 transition-colors cursor-pointer group"
                onClick={() => searchFromCard('ai-segment', { count: 303, segmentId: 'neighborhood-mvps' })}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-green-100 rounded group-hover:bg-green-200 transition-colors">
                    <MapPinIcon className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs text-gray-900 group-hover:text-green-900">Neighborhood MVPs</h5>
                    <p className="text-xs text-gray-600">303 • $104K potential</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <MagnifyingGlassIcon className="w-3 h-3 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Button variant="secondary" size="sm" className="text-xs px-2 py-1">View</Button>
                </div>
              </div>
              <div
                className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100 hover:bg-purple-50 hover:border-purple-200 transition-colors cursor-pointer group"
                onClick={() => searchFromCard('ai-segment', { count: 578, segmentId: 'level-up-list' })}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-purple-100 rounded group-hover:bg-purple-200 transition-colors">
                    <TrendingUpIcon className="w-3 h-3 text-purple-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs text-gray-900 group-hover:text-purple-900">Level-Up List</h5>
                    <p className="text-xs text-gray-600">578 • $21K potential</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <MagnifyingGlassIcon className="w-3 h-3 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Button variant="secondary" size="sm" className="text-xs px-2 py-1">View</Button>
                </div>
              </div>
              <Button variant="secondary" className="w-full mt-2 text-xs py-1.5" onClick={() => setView('fundraising')}>
                View All 8 Segments →
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={closeSearch}
        searchType={searchConfig.type}
        initialFilters={searchConfig.filters}
        searchContext={searchConfig.context}
      />
    </div>
  );
};

export default HomeDashboard;
