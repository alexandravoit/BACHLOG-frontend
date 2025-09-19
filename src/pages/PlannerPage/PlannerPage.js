import { CourseProvider } from '../../context';
import SemesterGrid from '../../components/planner/SemesterGrid/SemesterGrid.js';
import SearchBox from '../../components/planner/SearchBox/SearchBox.js';
import styles from './PlannerPage.module.css'

function PlannerPage() {
  return (
    <CourseProvider>
      <div className={styles.plannerPage}>
          <div className={styles.searchBox}> <SearchBox /> </div>
          <div className={styles.semesterGrid}> <SemesterGrid /> </div>
      </div>
    </CourseProvider>
  );
}
export default PlannerPage;