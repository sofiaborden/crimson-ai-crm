import React, { useState, useEffect } from 'react';
import { SparklesIcon, ClockIcon, SunIcon, PhoneIcon, MailIcon, TrendingUpIcon, LightBulbIcon } from '../../constants';
import { View } from '../../types';
import DonorProfileModal from '../ui/DonorProfileModal';
import { getDonorProfileByName } from '../../utils/mockDonorProfiles';
import { Donor } from '../../types';

interface BriefingAction {
  id: string;
  priority: 'high' | 'medium' | 'low';
  type: 'call' | 'email' | 'event' | 'follow-up';
  title: string;
  description: string;
  confidence: number;
  estimatedTime: string;
  potentialValue: number;
}

interface WeatherInsight {
  condition: string;
  impact: string;
  recommendation: string;
  icon: string;
}

interface QuickWin {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TimingRecommendation {
  activity: string;
  bestTime: string;
  reason: string;
  successRate: number;
}

interface AIDailyBriefingProps {
  setView?: (view: View) => void;
  setProfileId?: (id: string) => void;
}

const AIDailyBriefing: React.FC<AIDailyBriefingProps> = ({ setView, setProfileId }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [showDonorProfile, setShowDonorProfile] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [userName] = useState('Sofia');

  const [todaysActions] = useState<BriefingAction[]>([
    {
      id: '1',
      priority: 'high',
      type: 'call',
      title: 'Call Joseph Banks',
      description: 'Ready for $500 ask - highest confidence score this week',
      confidence: 92,
      estimatedTime: '15 min',
      potentialValue: 500
    },
    {
      id: '2',
      priority: 'high',
      type: 'email',
      title: 'Send Thank You Campaign',
      description: '23 donors from last week\'s event need immediate follow-up',
      confidence: 87,
      estimatedTime: '10 min',
      potentialValue: 2300
    },
    {
      id: '3',
      priority: 'medium',
      type: 'follow-up',
      title: 'Review Lapsed Donors',
      description: '12 Comeback Crew members showing re-engagement signals',
      confidence: 74,
      estimatedTime: '20 min',
      potentialValue: 1800
    }
  ]);

  const [weatherInsight] = useState<WeatherInsight>({
    condition: 'Rainy Day',
    impact: '+23% email open rates',
    recommendation: 'Perfect day for email campaigns - people check email more on rainy days',
    icon: '🌧️'
  });

  const [timingRecommendations] = useState<TimingRecommendation[]>([
    {
      activity: 'Phone Calls',
      bestTime: '10:30 AM - 12:00 PM',
      reason: 'Highest answer rates for your donor demographics',
      successRate: 78
    },
    {
      activity: 'Email Sends',
      bestTime: '2:00 PM - 4:00 PM',
      reason: 'Peak engagement window for political donors',
      successRate: 65
    }
  ]);

  const [successPrediction] = useState({
    weeklyGoalProgress: 67,
    likelihood: 85,
    recommendation: 'Focus on high-value calls today to hit your weekly target'
  });

  const [quickWins, setQuickWins] = useState<QuickWin[]>([
    {
      id: '1',
      title: 'Try new "FL + TX High-Dollar" Smart Segment',
      description: 'New AI segment ready for testing with 1,247 high-value prospects',
      completed: false
    },
    {
      id: '2',
      title: 'Review AI-powered Donor Snapshots',
      description: 'Click any profile to see new predictive insights and giving likelihood',
      completed: false
    },
    {
      id: '3',
      title: 'Test "Fill the Gaps" data cleaning tool',
      description: '2,942 donors missing party data - AI can predict with 89% accuracy',
      completed: false
    },
    {
      id: '4',
      title: 'Review recurring gift predictions',
      description: '12 donors with high likelihood to give again this month',
      completed: false
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleDonorClick = (donorName: string) => {
    const donor = getDonorProfileByName(donorName);
    if (donor) {
      setSelectedDonor(donor);
      setShowDonorProfile(true);
    }
  };

  const handleViewProfile = (donorName: string) => {
    if (setView && setProfileId) {
      if (donorName === 'Joseph Banks') {
        setProfileId('joseph-banks');
        setView('profile');
      }
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call': return <PhoneIcon className="w-4 h-4" />;
      case 'email': return <MailIcon className="w-4 h-4" />;
      case 'event': return <SunIcon className="w-4 h-4" />;
      case 'follow-up': return <TrendingUpIcon className="w-4 h-4" />;
      default: return <LightBulbIcon className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const renderClickableTitle = (title: string) => {
    // Check if the title contains a donor name we can make clickable
    const donorNames = ['Joseph Banks', 'Maria Rodriguez', 'David Chen', 'Sarah Johnson'];

    for (const donorName of donorNames) {
      if (title.includes(donorName)) {
        const parts = title.split(donorName);
        return (
          <>
            {parts[0]}
            <button
              onClick={() => handleDonorClick(donorName)}
              className="text-blue-600 hover:text-blue-800 underline-offset-2 hover:underline font-medium transition-colors"
            >
              {donorName}
            </button>
            {parts[1]}
          </>
        );
      }
    }

    return title;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      {/* Compact Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-crimson-blue p-2 rounded-lg">
          <SparklesIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-crimson-blue">
            🪄 {userName}'s Daily AI Briefing
          </h2>
          <p className="text-xs text-gray-600">Smart actions to maximize fundraising today</p>
        </div>
      </div>

      {/* Enhanced Top 3 Actions - Compact but Detailed */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm mb-3">
          <TrendingUpIcon className="w-4 h-4 text-crimson-blue" />
          Top 3 Actions Today
        </h3>

        <div className="space-y-3">
          {todaysActions.map((action, index) => (
            <div key={action.id} className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-blue-100 p-1.5 rounded">
                    {getTypeIcon(action.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 text-sm">{renderClickableTitle(action.title)}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getPriorityColor(action.priority)}`}>
                        {action.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{action.description}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1 text-gray-500">
                        <ClockIcon className="w-3 h-3" />
                        {action.estimatedTime}
                      </span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(action.potentialValue)}
                      </span>
                      <span className="font-semibold text-crimson-blue">
                        {action.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
                <button className="bg-crimson-blue text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-crimson-dark-blue transition-colors">
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compact Success Forecast & Quick Wins */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Success Forecast */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-crimson-blue flex items-center gap-2 text-sm">
              🎯 Success Forecast: {successPrediction.weeklyGoalProgress}%
            </h4>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${successPrediction.weeklyGoalProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600">
            <span className="font-medium text-green-600">{successPrediction.likelihood}% likely</span> to hit weekly target
          </p>
          <p className="text-xs text-gray-600 mt-1">{successPrediction.recommendation}</p>
        </div>

        {/* Quick Wins */}
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200 p-3">
          <h4 className="font-semibold text-crimson-blue flex items-center gap-2 text-sm mb-2">
            <LightBulbIcon className="w-4 h-4 text-yellow-500" />
            Quick Wins ({quickWins.filter(w => !w.completed).length} remaining)
          </h4>
          <div className="space-y-1.5">
            {quickWins.slice(0, 2).map((win) => (
              <div key={win.id} className="flex items-start gap-2">
                <button
                  onClick={() => setQuickWins(prev =>
                    prev.map(w => w.id === win.id ? { ...w, completed: !w.completed } : w)
                  )}
                  className={`mt-0.5 w-3 h-3 rounded border-2 flex items-center justify-center transition-colors ${
                    win.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 hover:border-green-400'
                  }`}
                >
                  {win.completed && (
                    <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <div className="flex-1">
                  <p className={`text-xs font-medium ${win.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {win.title}
                  </p>
                </div>
              </div>
            ))}
            {quickWins.length > 2 && (
              <button className="text-xs text-crimson-blue hover:text-crimson-dark-blue font-medium">
                Show all {quickWins.length} items →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Collapsible AI Insights */}
      <div className="border-t border-gray-200 pt-3">
        <button
          onClick={() => setShowInsights(!showInsights)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-crimson-blue transition-colors"
        >
          <LightBulbIcon className="w-4 h-4" />
          💡 AI Insights
          <svg className={`w-4 h-4 transition-transform ${showInsights ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showInsights && (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-blue-50 rounded p-2 border border-blue-200">
              <span className="font-medium text-blue-900">🌧️ {weatherInsight.condition}</span>
              <span className="text-blue-700 ml-2">{weatherInsight.impact}</span>
            </div>
            <div className="bg-purple-50 rounded p-2 border border-purple-200">
              <span className="font-medium text-purple-900">📞 Best call window:</span>
              <span className="text-purple-700 ml-1">10:30–12:00 (78% pickup)</span>
            </div>
          </div>
        )}
      </div>

      {/* Donor Profile Modal */}
      <DonorProfileModal
        donor={selectedDonor}
        isOpen={showDonorProfile}
        onClose={() => setShowDonorProfile(false)}
      />
    </div>
  );
};

export default AIDailyBriefing;
