import { TrendingUp, Users, BarChart3, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import MetricCard from "./MetricCard";
import SentimentChart from "./SentimentChart";
import ProductComparison from "./ProductComparison";
import DemographicsPanel from "./DemographicsPanel";
import ActivityTimeline from "./ActivityTimeline";
import FeedbackHighlights from "./FeedbackHighlights";
import TryMeScorePanel from "./TryMeScorePanel";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-teal-50/30">
      <div className="max-w-[1600px] mx-auto p-8">
        {/* ====== Header 區：標題 + 按鈕，保持原本 ====== */}
        {/* 你的 header 寫在這裡 */}

        {/* 🟣 1. TryMe Overview 先放在最上面（在四張卡片前面） */}
        <div className="mb-8">
          <TryMeScorePanel />
        </div>

        {/* 🟩 2. 四張 KPI Metric 卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Trials */}
          <Link to="/trials">
            <MetricCard
              icon={<Users className="w-6 h-6" />}
              title="Total Trials"
              value="24,847"
              change="+18.2%"
              positive={true}
              gradient="from-purple-400 to-purple-600"
            />
          </Link>

          {/* Unique Users */}
          <Link to="/unique-users">
            <MetricCard
              icon={<Globe className="w-6 h-6" />}
              title="Unique Users"
              value="18,293"
              change="+12.5%"
              positive={true}
              gradient="from-teal-400 to-teal-600"
            />
          </Link>

          {/* Completion Rate */}
          <Link to="/completion-rate">
            <MetricCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="Completion Rate"
              value="87.4%"
              change="+5.3%"
              positive={true}
              gradient="from-purple-400 to-teal-500"
            />
          </Link>

          {/* Avg Trial Duration */}
          <Link to="/avg-trial-duration">
            <MetricCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Avg Trial Duration"
              value="14.2 days"
              change="-2.1 days"
              positive={true}
              gradient="from-teal-400 to-purple-500"
            />
          </Link>
        </div>

        {/* 🟦 3. Sentiment + Feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SentimentChart />
          <FeedbackHighlights />
        </div>

        {/* 🟨 4. Product Comparison */}
        <div className="mb-8">
          <ProductComparison />
        </div>

        {/* 🟧 5. Timeline + Demographics */}
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
