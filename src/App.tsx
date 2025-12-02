// App.tsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import TotalTrialsPage from "./components/TotalTrialsPage";
import UniqueUsersPage from "./components/UniqueUsersPage";
import CompletionRatePage from "./components/CompletionRatePage";
import AvgTrialDurationPage from "./components/AvgTrialDurationPage";
import FeedbackDetailPage from "./components/FeedbackDetailPage";
import ComparisonFilterPage from "./components/ComparisonFilterPage";

export default function App() {
  return (
    <Routes>
      {/* 首頁：總覽 Dashboard */}
      <Route path="/" element={<Dashboard />} />

      {/* 四個 KPI 的細頁 */}
      <Route path="/trials" element={<TotalTrialsPage />} />
      <Route path="/unique-users" element={<UniqueUsersPage />} />
      <Route path="/completion-rate" element={<CompletionRatePage />} />
      <Route path="/avg-trial-duration" element={<AvgTrialDurationPage />} />

      {/* Feedback 細頁 */}
      <Route path="/feedback" element={<FeedbackDetailPage />} />
      {/* Comparison Filter Page */}
      <Route path="/comparison" element= {<ComparisonFilterPage/>}/> 
    </Routes>
  );
}
