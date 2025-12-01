import { TrendingUp, Users, Award, Sparkles, BarChart3, Globe, Leaf } from 'lucide-react';
import MetricCard from './MetricCard';
import SentimentChart from './SentimentChart';
import ProductComparison from './ProductComparison';
import DemographicsPanel from './DemographicsPanel';
import ActivityTimeline from './ActivityTimeline';
import ESGPanel from './ESGPanel';
import FeedbackHighlights from './FeedbackHighlights';
import TryMeScorePanel from './TryMeScorePanel';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-teal-50/30">
      <div className="max-w-[1600px] mx-auto p-8">
        <header className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Shiseido Analytics
              </h1>
              <p className="text-slate-600 text-lg">Enterprise Beauty Trial Intelligence Platform</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-5 py-2.5 bg-white rounded-xl text-slate-700 font-medium shadow-sm hover:shadow-md transition-all border border-slate-200">
                Export Report
              </button>
              <button className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all">
                Live Data
              </button>
            </div>
          </div>
          <div className="text-sm text-slate-500 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Last updated: 2 minutes ago
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<Users className="w-6 h-6" />}
            title="Total Trials"
            value="24,847"
            change="+18.2%"
            positive={true}
            gradient="from-purple-400 to-purple-600"
          />
          <MetricCard
            icon={<Globe className="w-6 h-6" />}
            title="Unique Users"
            value="18,293"
            change="+12.5%"
            positive={true}
            gradient="from-teal-400 to-teal-600"
          />
          <MetricCard
            icon={<BarChart3 className="w-6 h-6" />}
            title="Completion Rate"
            value="87.4%"
            change="+5.3%"
            positive={true}
            gradient="from-purple-400 to-teal-500"
          />
          <MetricCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Avg Trial Duration"
            value="14.2 days"
            change="-2.1 days"
            positive={true}
            gradient="from-teal-400 to-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TryMeScorePanel />
          </div>
          <div>
            <ESGPanel />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SentimentChart />
          <FeedbackHighlights />
        </div>

        <div className="mb-8">
          <ProductComparison />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ActivityTimeline />
          </div>
          <div>
            <DemographicsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
