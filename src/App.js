import { Routes, Route } from 'react-router-dom';
import AppHeader from './components/layout/AppHeader/AppHeader.js';
import AppFooter from './components/layout/AppFooter/AppFooter.js';
import LandingPage from './pages/LandingPage/LandingPage.js';
import PlannerPage from './pages/PlannerPage/PlannerPage.js';
import ModulesPage from './pages/ModulesPage/ModulesPage.js';
import styles from './global.module.css'

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/modules" element={<ModulesPage />} />
      </Routes>
      <AppFooter />
    </div>
  );
}

export default App;
