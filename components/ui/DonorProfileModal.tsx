import React, { useState } from 'react';
import { Donor } from '../../types';
import DonorProfile from '../profile/DonorProfile';
import EnhancedDonorProfile from '../profile/EnhancedDonorProfile';
import DonorIntelligencePanel from '../profile/DonorIntelligencePanel';
import CommunicationTimeline from '../profile/CommunicationTimeline';
import { XMarkIcon, SparklesIcon, BrainIcon, ChatBubbleLeftRightIcon, UserIcon } from '../../constants';

interface DonorProfileModalProps {
  donor: Donor | null;
  isOpen: boolean;
  onClose: () => void;
}

const DonorProfileModal: React.FC<DonorProfileModalProps> = ({ donor, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'intelligence' | 'timeline'>('profile');

  if (!isOpen || !donor) return null;

  const tabs = [
    { id: 'profile', label: 'Enhanced Profile', icon: <SparklesIcon className="w-4 h-4" /> },
    { id: 'intelligence', label: 'AI Intelligence', icon: <BrainIcon className="w-4 h-4" /> },
    { id: 'timeline', label: 'Communications', icon: <ChatBubbleLeftRightIcon className="w-4 h-4" /> }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden">
        {/* Modern Header with Tabs */}
        <div className="bg-gradient-to-r from-crimson-blue to-blue-600 text-white p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <img
                src={donor.photoUrl}
                alt={donor.name}
                className="w-16 h-16 rounded-full ring-4 ring-white/30 shadow-lg"
              />
              <div>
                <h2 className="text-2xl font-bold">{donor.name}</h2>
                <p className="text-blue-100">{donor.email}</p>
                <div className="flex gap-2 mt-2">
                  {donor.aiBadges.slice(0, 2).map(badge => (
                    <span key={badge} className="bg-white/20 text-white text-xs px-2 py-1 rounded-full border border-white/30">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 bg-white/10 rounded-lg p-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-crimson-blue shadow-sm font-semibold'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-200px)]">
          {activeTab === 'profile' && <EnhancedDonorProfile donor={donor} />}
          {activeTab === 'intelligence' && <DonorIntelligencePanel donorId={donor.id} donorName={donor.name} />}
          {activeTab === 'timeline' && <CommunicationTimeline donorName={donor.name} events={[]} />}
        </div>
      </div>
    </div>
  );
};

export default DonorProfileModal;
