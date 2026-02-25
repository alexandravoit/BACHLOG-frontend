import { Routes, Route } from 'react-router-dom';
import AppHeader from './components/layout/AppHeader/AppHeader.js';
import AppFooter from './components/layout/AppFooter/AppFooter.js';
import LandingPage from './pages/LandingPage/LandingPage.js';
import PlannerPage from './pages/PlannerPage/PlannerPage.js';
import ModulePage from './pages/ModulePage/ModulePage.js';
import styles from './global.module.css'
import {CourseProvider} from "./context";

function App() {
  return (
    <CourseProvider>
        <div className={styles.app}>
          <AppHeader />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/semesters" element={<PlannerPage />} />
            <Route path="/modules" element={<ModulePage />} />
          </Routes>
          <AppFooter />
        </div>
    </CourseProvider>
  );
}

export default App;
