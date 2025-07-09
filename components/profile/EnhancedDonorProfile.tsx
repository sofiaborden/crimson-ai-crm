import React, { useState } from 'react';
import { Donor } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import {
  SparklesIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  FireIcon,
  TrendingUpIcon,
  UserGroupIcon,
  ChartBarIcon,
  BoltIcon,
  EyeIcon,
  HeartIcon,
  TrophyIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  StarIcon
} from '../../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, CartesianGrid } from 'recharts';

interface EnhancedDonorProfileProps {
  donor: Donor;
}

const AIInsightCard: React.FC<{
  title: string;
  insight: string;
  confidence: number;
  action?: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, insight, confidence, action, icon, color }) => (
  <div className={`bg-gradient-to-r ${color} rounded-xl p-4 border shadow-sm hover:shadow-md transition-all duration-300`}>
    <div className="flex items-start gap-3">
      <div className="bg-white p-2 rounded-lg shadow-sm">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
          <div className="flex items-center gap-1">
            <StarIcon className="w-3 h-3 text-yellow-500" />
            <span className="text-xs font-semibold text-gray-700">{confidence}%</span>
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-3 leading-relaxed">{insight}</p>
        {action && (
          <Button variant="secondary" size="xs" className="font-medium">
            {action}
          </Button>
        )}
      </div>
    </div>
  </div>
);

const QuickActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  badge?: string;
}> = ({ icon, label, onClick, variant = 'secondary', badge }) => (
  <div className="relative">
    <Button
      variant={variant}
      size="sm"
      onClick={onClick}
      className="flex items-center gap-2 w-full justify-center font-medium"
    >
      {icon}
      {label}
    </Button>
    {badge && (
      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
        {badge}
      </div>
    )}
  </div>
);

const MetricCard: React.FC<{
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'stable';
  color?: string;
  subtitle?: string;
}> = ({ label, value, trend, color = 'text-gray-900', subtitle }) => (
  <div className="text-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-center gap-1 mb-1">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      {trend && (
        <TrendingUpIcon className={`w-4 h-4 ${
          trend === 'up' ? 'text-green-500' : 
          trend === 'down' ? 'text-red-500 rotate-180' : 
          'text-gray-400'
        }`} />
      )}
    </div>
    <p className="text-sm font-medium text-gray-600">{label}</p>
    {subtitle && (
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    )}
  </div>
);

const EnhancedDonorProfile: React.FC<EnhancedDonorProfileProps> = ({ donor }) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'intelligence' | 'engagement' | 'actions'>('overview');

  // AI Snapshot for political fundraising context
  const aiSnapshot = `${donor.name.split(' ')[0]} is a cornerstone supporter and community leader in the Neighborhood MVPs segment. He has consistently increased his giving over the past 3 years and serves as an informal campaign ambassador in his community. His recent $5,000 gift demonstrates strong commitment. He prefers in-person meetings and responds well to policy briefings. Excellent candidate for campaign advisory role.`;

  // Political fundraising tier levels
  const tierLevel = "Major Donor - Eagle Circle";
  const tierBenefits = ["Quarterly briefings with candidate", "VIP event access", "Policy preview calls"];

  // Contact Intelligence for political context
  const contactIntelligence = {
    preferredMethod: "In-person meetings",
    bestTimes: "Tuesday-Thursday, 2-4 PM",
    responseRate: "94%",
    avgResponseTime: "2.3 hours",
    lastContact: "12 days ago",
    nextScheduled: "Policy briefing - Jan 25"
  };

  // Giving Intelligence with political focus
  const givingIntelligence = {
    totalLifetime: "$47,500",
    thisElectionCycle: "$12,500",
    averageGift: "$850",
    givingTrend: "+40% vs last cycle",
    peakMonths: "March, October",
    motivations: ["Policy alignment", "Candidate access", "Community impact"]
  };

  // Digital engagement tracking
  const digitalEngagement = {
    emailOpen: "87%",
    emailClick: "34%",
    websiteVisits: "23 this month",
    socialMedia: "Active on LinkedIn, Twitter",
    volunteerHours: "45 hours this cycle",
    eventAttendance: "8 of 10 events"
  };

  // Next Best Actions for political fundraising
  const nextBestActions = [
    {
      action: "Schedule Policy Briefing",
      priority: "High",
      confidence: "92%",
      expectedOutcome: "$2,500 ask",
      timeframe: "Next 2 weeks",
      reason: "Responds well to policy discussions and due for major ask"
    },
    {
      action: "Invite to Advisory Committee",
      priority: "Medium",
      confidence: "78%",
      expectedOutcome: "Increased engagement",
      timeframe: "Next month",
      reason: "Leadership potential and community influence"
    },
    {
      action: "Host House Party Ask",
      priority: "High",
      confidence: "85%",
      expectedOutcome: "$5,000 + network",
      timeframe: "Next 6 weeks",
      reason: "Previous host success and strong network"
    }
  ];

  // Mock giving history data
  const givingHistory = [
    { month: 'Jan', amount: 250, interactions: 3 },
    { month: 'Feb', amount: 0, interactions: 1 },
    { month: 'Mar', amount: 500, interactions: 4 },
    { month: 'Apr', amount: 250, interactions: 2 },
    { month: 'May', amount: 750, interactions: 5 },
    { month: 'Jun', amount: 0, interactions: 1 }
  ];

  const handleQuickCall = () => {
    alert(`📞 Calling ${donor.name}\n\nAI Suggested Script:\n"Hi ${donor.name.split(' ')[0]}, this is Sofia from the campaign. I hope you're doing well! I wanted to follow up on our conversation about the upcoming election. Based on your previous support, I think you'd be interested in our new voter outreach initiative..."\n\nSuggested ask: $${donor.predictiveAsk.toLocaleString()}`);
  };

  const handleQuickEmail = () => {
    alert(`✉️ AI-Generated Email Draft:\n\nSubject: Your impact in action - see what your support accomplished\n\nHi ${donor.name.split(' ')[0]},\n\nI hope this finds you well! I wanted to share some exciting updates on how your generous support has been making a real difference...\n\n[Personalized content based on donor interests and giving history]\n\nBest regards,\nSofia`);
  };

  const handleScheduleMeeting = () => {
    alert(`📅 Smart Scheduling Assistant:\n\nBest times for ${donor.name}:\n• Tuesday, 2:00 PM - 4:00 PM (87% response rate)\n• Wednesday, 10:00 AM - 12:00 PM (82% response rate)\n• Thursday, 3:00 PM - 5:00 PM (79% response rate)\n\nPreferred location: Coffee meeting (based on past preferences)\nSuggested agenda: Discuss upcoming initiatives, thank for past support, explore increased engagement`);
  };

  return (
    <div className="space-y-6">
      {/* AI Snapshot Section */}
      <Card>
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-purple-100 p-3 rounded-xl">
              <SparklesIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">AI Political Intelligence Snapshot</h3>
              <p className="text-gray-700 leading-relaxed">{aiSnapshot}</p>
            </div>
          </div>

          {/* Tier Level and Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="text-center">
              <div className="text-lg font-bold text-crimson-blue">{tierLevel}</div>
              <div className="text-sm text-gray-600">Donor Tier</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">${givingIntelligence.thisElectionCycle}</div>
              <div className="text-sm text-gray-600">This Cycle</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{contactIntelligence.responseRate}</div>
              <div className="text-sm text-gray-600">Response Rate</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: <UserIcon className="w-4 h-4" /> },
          { id: 'intelligence', label: 'Intelligence', icon: <BrainIcon className="w-4 h-4" /> },
          { id: 'engagement', label: 'Engagement', icon: <HeartIcon className="w-4 h-4" /> },
          { id: 'actions', label: 'Next Actions', icon: <TrophyIcon className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
              activeSection === tab.id
                ? 'bg-white text-crimson-blue shadow-sm font-semibold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Intelligence */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <PhoneIcon className="w-5 h-5 text-blue-600" />
                Contact Intelligence
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Preferred Method:</span>
                  <span className="font-medium">{contactIntelligence.preferredMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Best Times:</span>
                  <span className="font-medium">{contactIntelligence.bestTimes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Rate:</span>
                  <span className="font-medium text-green-600">{contactIntelligence.responseRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Response Time:</span>
                  <span className="font-medium">{contactIntelligence.avgResponseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Contact:</span>
                  <span className="font-medium">{contactIntelligence.lastContact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Scheduled:</span>
                  <span className="font-medium text-blue-600">{contactIntelligence.nextScheduled}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Giving Intelligence */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
                Giving Intelligence
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lifetime Total:</span>
                  <span className="font-medium">{givingIntelligence.totalLifetime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">This Election Cycle:</span>
                  <span className="font-medium text-crimson-blue">{givingIntelligence.thisElectionCycle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Gift:</span>
                  <span className="font-medium">{givingIntelligence.averageGift}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Giving Trend:</span>
                  <span className="font-medium text-green-600">{givingIntelligence.givingTrend}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Peak Months:</span>
                  <span className="font-medium">{givingIntelligence.peakMonths}</span>
                </div>
                <div>
                  <span className="text-gray-600">Motivations:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {givingIntelligence.motivations.map((motivation, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                        {motivation}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeSection === 'intelligence' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Churn Risk Analysis */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-orange-600" />
                Churn Risk Analysis
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Risk Level:</span>
                  <Badge className="bg-green-100 text-green-800 border-green-200">Low (15%)</Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Risk Factors:</div>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Consistent giving pattern (+2 points)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      High event attendance (+3 points)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      No recent personal contact (-1 point)
                    </li>
                  </ul>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">
                    <strong>Recommendation:</strong> Schedule quarterly check-in to maintain relationship strength.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Donation Likelihood */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUpIcon className="w-5 h-5 text-green-600" />
                Donation Likelihood
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">92%</div>
                  <div className="text-sm text-gray-600">Likely to give in next 30 days</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Optimal Ask Amount:</span>
                    <span className="font-medium">$750 - $1,200</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Best Ask Timing:</span>
                    <span className="font-medium">Next 2 weeks</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Success Probability:</span>
                    <span className="font-medium text-green-600">89%</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>AI Insight:</strong> Similar donors in this segment have 94% success rate with policy-focused asks.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Upsell Opportunities */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrophyIcon className="w-5 h-5 text-purple-600" />
                Upsell Opportunities
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="font-medium text-purple-900 mb-1">Advisory Committee Invitation</div>
                  <div className="text-sm text-purple-700">Potential for $5K+ annual commitment</div>
                  <div className="text-xs text-purple-600 mt-1">Confidence: 78%</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-medium text-blue-900 mb-1">Monthly Sustainer Program</div>
                  <div className="text-sm text-blue-700">$200/month recurring potential</div>
                  <div className="text-xs text-blue-600 mt-1">Confidence: 65%</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-medium text-green-900 mb-1">Host Committee Chair</div>
                  <div className="text-sm text-green-700">$10K+ event hosting opportunity</div>
                  <div className="text-xs text-green-600 mt-1">Confidence: 82%</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Political Engagement Score */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BrainIcon className="w-5 h-5 text-indigo-600" />
                Political Engagement Score
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">94/100</div>
                  <div className="text-sm text-gray-600">Highly Engaged Supporter</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Policy Interest:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{width: '95%'}}></div>
                      </div>
                      <span className="text-xs">95%</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Event Participation:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{width: '88%'}}></div>
                      </div>
                      <span className="text-xs">88%</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Volunteer Activity:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                      <span className="text-xs">92%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeSection === 'engagement' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Email Engagement */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MailIcon className="w-5 h-5 text-blue-600" />
                Email Engagement
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Open Rate:</span>
                  <span className="font-medium text-green-600">{digitalEngagement.emailOpen}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Click Rate:</span>
                  <span className="font-medium text-blue-600">{digitalEngagement.emailClick}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Recent Engagement:</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Policy Update - Jan 15</span>
                      <span className="text-green-600">Opened, Clicked</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Event Invite - Jan 12</span>
                      <span className="text-green-600">Opened, RSVP'd</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Newsletter - Jan 8</span>
                      <span className="text-blue-600">Opened</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Website Behavior */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ComputerDesktopIcon className="w-5 h-5 text-purple-600" />
                Website Behavior
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Visits:</span>
                  <span className="font-medium">{digitalEngagement.websiteVisits}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Most Visited Pages:</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Policy Positions</span>
                      <span className="text-gray-500">8 visits</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Event Calendar</span>
                      <span className="text-gray-500">6 visits</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Donation Page</span>
                      <span className="text-gray-500">4 visits</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-800">
                    <strong>Insight:</strong> High policy page engagement indicates strong issue-based motivation.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Social Media Activity */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <UserGroupIcon className="w-5 h-5 text-indigo-600" />
                Social Media Activity
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Platforms:</span>
                  <span className="font-medium">{digitalEngagement.socialMedia}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Recent Activity:</div>
                  <div className="space-y-2">
                    <div className="p-2 bg-blue-50 rounded border border-blue-200">
                      <div className="text-sm font-medium">LinkedIn - Jan 16</div>
                      <div className="text-xs text-gray-600">Shared campaign policy post</div>
                    </div>
                    <div className="p-2 bg-blue-50 rounded border border-blue-200">
                      <div className="text-sm font-medium">Twitter - Jan 14</div>
                      <div className="text-xs text-gray-600">Retweeted candidate statement</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Volunteer Activities */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <HeartIcon className="w-5 h-5 text-red-600" />
                Volunteer Activities
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Hours This Cycle:</span>
                  <span className="font-medium text-red-600">{digitalEngagement.volunteerHours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Event Attendance:</span>
                  <span className="font-medium">{digitalEngagement.eventAttendance}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Recent Activities:</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Phone Bank - Jan 18</span>
                      <span className="text-gray-500">3 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Canvassing - Jan 15</span>
                      <span className="text-gray-500">4 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Event Setup - Jan 10</span>
                      <span className="text-gray-500">2 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeSection === 'actions' && (
        <div className="space-y-6">
          {/* Next Best Actions */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrophyIcon className="w-5 h-5 text-gold-600" />
                Next Best Actions
              </h3>
              <div className="space-y-4">
                {nextBestActions.map((action, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{action.action}</h4>
                        <p className="text-sm text-gray-600 mt-1">{action.reason}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${
                          action.priority === 'High' ? 'bg-red-100 text-red-800 border-red-200' :
                          action.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          'bg-green-100 text-green-800 border-green-200'
                        } text-xs`}>
                          {action.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Expected:</span>
                        <div className="font-medium">{action.expectedOutcome}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Timeframe:</span>
                        <div className="font-medium">{action.timeframe}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Confidence:</span>
                        <div className="font-medium text-green-600">{action.confidence}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button variant="primary" size="sm">Execute Action</Button>
                      <Button variant="secondary" size="sm">Schedule</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <QuickActionButton
                  icon={<PhoneIcon className="w-4 h-4" />}
                  label="Call Now"
                  onClick={handleQuickCall}
                  variant="primary"
                />
                <QuickActionButton
                  icon={<MailIcon className="w-4 h-4" />}
                  label="Send Email"
                  onClick={handleQuickEmail}
                  variant="secondary"
                />
                <QuickActionButton
                  icon={<CalendarIcon className="w-4 h-4" />}
                  label="Schedule Meeting"
                  onClick={handleScheduleMeeting}
                  variant="secondary"
                />
                <QuickActionButton
                  icon={<BellIcon className="w-4 h-4" />}
                  label="Set Reminder"
                  onClick={() => alert('Setting smart reminder...')}
                  variant="secondary"
                  badge="3"
                />
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnhancedDonorProfile;
