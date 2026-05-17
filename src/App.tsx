import { GameStateProvider } from './src/context/GameStateContext';
import { SplashLogin } from './src/screens/SplashLogin';
import { Survey } from './src/screens/Survey';
import { Dashboard } from './src/screens/Dashboard';
import { LearnPath } from './src/screens/LearnPath';
import { Lesson } from './src/screens/Lesson';
import { CameraTest } from './src/screens/CameraTest';
import { Leaderboard } from './src/screens/Leaderboard';
import { Profile } from './src/screens/Profile';
export function App() {
  return (
    <GameStateProvider>
      <BrowserRouter>
        <div className="w-full h-full min-h-screen bg-slate-50 relative">
          <Routes>
            <Route path="/" element={<SplashLogin />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learn" element={<LearnPath />} />
            <Route path="/lesson/:unitId" element={<Lesson />} />
            <Route path="/test" element={<CameraTest />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GameStateProvider>);

}
