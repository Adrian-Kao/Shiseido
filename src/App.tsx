// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import TotalTrialsPage from "./components/TotalTrialsPage";
import UniqueUsersPage from "./components/UniqueUsersPage";
import CompletionRatePage from "./components/CompletionRatePage";
import AvgTrialDurationPage from "./components/AvgTrialDurationPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/trials" element={<TotalTrialsPage />} />
      <Route path="/users" element={<UniqueUsersPage />} />
      <Route path="/completion" element={<CompletionRatePage />} />
      <Route path="/duration" element={<AvgTrialDurationPage />} />
    </Routes>
  );
}

export default App;
