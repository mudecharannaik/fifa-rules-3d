import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import ProgressBar from './components/UI/ProgressBar';
import { useProgress } from './hooks/useProgress';

// Pages
import Home from './pages/00_Home';
import TheField from './pages/01_TheField';
import TheBall from './pages/02_TheBall';
import ThePlayers from './pages/03_ThePlayers';
import PlayerEquipment from './pages/04_PlayerEquipment';
import Referees from './pages/05_Referees';
import MatchDuration from './pages/07_MatchDuration';
import StartAndRestart from './pages/08_StartAndRestart';
import BallInOut from './pages/09_BallInOut';
import DeterminingOutcome from './pages/10_DeterminingOutcome';
import Offside from './pages/11_Offside';
import FoulsAndMisconduct from './pages/12_FoulsAndMisconduct';
import FreeKicks from './pages/13_FreeKicks';
import PenaltyKicks from './pages/14_PenaltyKicks';
import ThrowIns from './pages/15_ThrowIns';
import GoalKicks from './pages/16_GoalKicks';
import CornerKicks from './pages/17_CornerKicks';
import VARAndTechnology from './pages/18_VARAndTechnology';
import WC2026Format from './pages/19_WC2026Format';

import './assets/global.css';

// Total number of law pages we have built
const TOTAL_LAWS = 18;

function AppContent() {
  const location = useLocation();
  const { visited, markVisited } = useProgress();

  // Whenever the URL path changes, mark it as visited
  useEffect(() => {
    if (location.pathname !== '/') {
      markVisited(location.pathname);
    }
  }, [location, markVisited]);

  return (
    <>
      <Navbar visited={visited} />
      <div style={{ paddingBottom: '50px' }}> {/* Add padding so content isn't hidden behind the bottom bar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/field" element={<TheField />} />
          <Route path="/ball" element={<TheBall />} />
          <Route path="/players" element={<ThePlayers />} />
          <Route path="/equipment" element={<PlayerEquipment />} />
          <Route path="/referees" element={<Referees />} />
          <Route path="/duration" element={<MatchDuration />} />
          <Route path="/start" element={<StartAndRestart />} />
          <Route path="/inout" element={<BallInOut />} />
          <Route path="/outcome" element={<DeterminingOutcome />} />
          <Route path="/offside" element={<Offside />} />
          <Route path="/fouls" element={<FoulsAndMisconduct />} />
          <Route path="/freekicks" element={<FreeKicks />} />
          <Route path="/penalty" element={<PenaltyKicks />} />
          <Route path="/throwin" element={<ThrowIns />} />
          <Route path="/goalkick" element={<GoalKicks />} />
          <Route path="/corner" element={<CornerKicks />} />
          <Route path="/var" element={<VARAndTechnology />} />
          <Route path="/wc2026" element={<WC2026Format />} />
        </Routes>
      </div>
      <ProgressBar visited={visited} totalLaws={TOTAL_LAWS} />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;