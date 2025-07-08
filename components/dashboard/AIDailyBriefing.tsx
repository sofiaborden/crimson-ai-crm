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
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 p-2 rounded-lg">
            <SparklesIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {getGreeting()}, {userName}!
            </h2>
            <p className="text-xs text-gray-600">AI-powered daily briefing</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-600">
            {currentTime.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            })}
          </div>
          <div className="text-sm font-semibold text-gray-900">
            {currentTime.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Top 3 Actions */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
            <TrendingUpIcon className="w-4 h-4 text-blue-500" />
            Top 3 Actions Today
          </h3>

          <div className="space-y-2">
            {todaysActions.map((action, index) => (
              <div key={action.id} className="bg-white rounded-lg border border-gray-200 p-2.5 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2 flex-1">
                    <div className="bg-blue-100 p-1 rounded">
                      {getTypeIcon(action.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 text-sm">{renderClickableTitle(action.title)}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full border ${getPriorityColor(action.priority)}`}>
                          {action.priority}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{action.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <ClockIcon className="w-3 h-3" />
                          {action.estimatedTime}
                        </span>
                        <span className="font-medium text-green-600">
                          {formatCurrency(action.potentialValue)}
                        </span>
                        <span className="font-medium text-blue-600">
                          {action.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium hover:bg-blue-600 transition-colors">
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="space-y-3">
          {/* Weather Insight */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200 p-3">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Weather Impact
            </h4>
            <div className="space-y-1.5">
              <div className="text-sm">
                <span className="font-medium text-gray-900">{weatherInsight.condition}</span>
                <span className="text-green-600 ml-2 text-xs font-medium">{weatherInsight.impact}</span>
              </div>
              <p className="text-xs text-gray-600">{weatherInsight.recommendation}</p>
            </div>
          </div>

          {/* Timing Recommendations */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-3">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <ClockIcon className="w-4 h-4 text-purple-500" />
              Optimal Timing
            </h4>
            <div className="space-y-2">
              {timingRecommendations.map((timing, index) => (
                <div key={index} className="text-sm">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-medium text-gray-900 text-xs">{timing.activity}</span>
                    <span className="text-xs text-green-600 font-medium">{timing.successRate}%</span>
                  </div>
                  <div className="text-purple-600 font-medium text-xs">{timing.bestTime}</div>
                  <div className="text-gray-600 text-xs">{timing.reason}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Prediction */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-3">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <TrendingUpIcon className="w-4 h-4 text-green-500" />
              Success Forecast
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Weekly Goal</span>
                <span className="text-sm font-medium text-gray-900">{successPrediction.weeklyGoalProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${successPrediction.weeklyGoalProgress}%` }}
                ></div>
              </div>
              <div className="text-sm">
                <span className="font-medium text-green-600">{successPrediction.likelihood}% likely</span>
                <span className="text-gray-600 text-xs"> to hit target</span>
              </div>
              <p className="text-xs text-gray-600">{successPrediction.recommendation}</p>
            </div>
          </div>

          {/* Quick Wins */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200 p-3">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <LightBulbIcon className="w-4 h-4 text-yellow-500" />
              Quick Wins
            </h4>
            <div className="space-y-2">
              {quickWins.map((win) => (
                <div key={win.id} className="flex items-start gap-2">
                  <button
                    onClick={() => setQuickWins(prev =>
                      prev.map(w => w.id === win.id ? { ...w, completed: !w.completed } : w)
                    )}
                    className={`mt-0.5 w-3.5 h-3.5 rounded border-2 flex items-center justify-center transition-colors ${
                      win.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {win.completed && (
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <div className="flex-1">
                    <p className={`text-xs font-medium ${win.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {win.title}
                    </p>
                    <p className={`text-xs ${win.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                      {win.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
