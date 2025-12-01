import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import UniqueUsersPage from "./components/UniqueUsersPage";
import CompletionRatePage from "./components/CompletionRatePage";
import AvgTrialDurationPage from "./components/AvgTrialDurationPage";
import FeedbackDetailPage from "./components/FeedbackDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/unique-users" element={<UniqueUsersPage />} />
      <Route path="/completion-rate" element={<CompletionRatePage />} />
      <Route path="/avg-trial-duration" element={<AvgTrialDurationPage />} />
      <Route path="/feedback" element={<FeedbackDetailPage />} />
    </Routes>
  );
}

export default App;
