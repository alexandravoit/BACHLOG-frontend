import SemesterGrid from '../../components/planner/SemesterGrid/SemesterGrid.js';
import SearchBox from '../../components/planner/SearchBox/SearchBox.js';
import styles from './PlannerPage.module.css'

function PlannerPage() {
  return (
    <div className={styles.plannerPage}>

      <div className={styles.searchBox}> <SearchBox /> </div>
      <div className={styles.semesterGrid}> <SemesterGrid /> </div>
      
    </div>
  );
}
export default PlannerPage;