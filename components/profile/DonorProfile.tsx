import React from 'react';
import { Donor } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { SparklesIcon, MailIcon, PhoneIcon } from '../../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DonorProfileProps {
  donor: Donor;
}

const StatCard: React.FC<{ label: string; value: string | number; }> = ({ label, value }) => (
    <div className="text-center">
        <p className="text-2xl font-bold text-text-primary">{value}</p>
        <p className="text-sm text-text-secondary">{label}</p>
    </div>
);

const DonorProfile: React.FC<DonorProfileProps> = ({ donor }) => {
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left md:col-span-1">
            <img src={donor.photoUrl} alt={donor.name} className="w-32 h-32 rounded-full mb-4 ring-4 ring-crimson-blue/20" />
            <h2 className="text-2xl font-bold text-text-primary">{donor.name}</h2>
            <p className="text-text-secondary">{donor.email}</p>
            <p className="text-text-secondary">{donor.phone}</p>
            <div className="flex gap-2 mt-4">
              {donor.aiBadges.map(badge => <Badge key={badge} color="blue">{badge}</Badge>)}
            </div>
          </div>
          
          <div className="md:col-span-2 bg-base-200 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-base-100 p-4 rounded-lg text-center shadow-sm">
                    <p className="text-sm text-text-secondary">Predictive Ask Amount</p>
                    <p className="text-3xl font-bold text-crimson-blue">${donor.predictiveAsk}</p>
                </div>
                <div className="bg-base-100 p-4 rounded-lg text-center shadow-sm">
                    <p className="text-sm text-text-secondary">Recurrence Prediction</p>
                    <p className="text-xl font-semibold text-text-primary pt-2">{donor.recurrencePrediction}</p>
                </div>
                <div className="bg-base-100 p-4 rounded-lg text-center shadow-sm">
                    <p className="text-sm text-text-secondary">Suggested Action</p>
                    <p className="text-base font-semibold text-text-primary pt-1 leading-tight">{donor.suggestedAction}</p>
                </div>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card title="Giving Overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <StatCard label="Total Raised" value={`$${donor.givingOverview.totalRaised.toLocaleString()}`} />
                    <StatCard label="Consecutive Gifts" value={donor.givingOverview.consecutiveGifts} />
                    <StatCard label="Tier" value={donor.givingOverview.tier} />
                </div>
                <div style={{ width: '100%', height: 250 }}>
                    <ResponsiveContainer>
                        <BarChart data={donor.givingOverview.topGifts} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value/1000}k`} />
                            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} cursor={{fill: 'rgba(47, 127, 195, 0.1)'}} />
                            <Bar dataKey="value" fill="#2f7fc3" barSize={40} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-6">
              <Card title="AI Donor Snapshot" titleClassName="flex items-center gap-2" headerActions={<SparklesIcon className="w-5 h-5 text-crimson-blue" />}>
                  <p className="text-text-secondary text-sm leading-relaxed">{donor.aiSnapshot}</p>
              </Card>
              <Card title="Actions">
                <div className="grid grid-cols-2 gap-3">
                    <Button><MailIcon className="w-4 h-4" /> Send Email</Button>
                    <Button variant="secondary"><PhoneIcon className="w-4 h-4" /> Add to Call List</Button>
                    <Button variant="secondary">Print Call Sheet</Button>
                    <Button variant="secondary">Add Note</Button>
                </div>
              </Card>
          </div>
      </div>
    </div>
  );
};

export default DonorProfile;