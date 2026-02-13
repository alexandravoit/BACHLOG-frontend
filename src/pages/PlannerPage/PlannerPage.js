import { useCourse } from '../../context';
import SemesterGrid from './components/SemesterGrid/SemesterGrid.js';
import SearchBox from './components/SearchBox/SearchBox.js';
import ActionMenu from './components/ActionMenu/ActionMenu.js';
import SlidingPane from '../../components/layout/SlidingPane/SlidingPane.js';
import CourseDetails from '../../components/layout/SlidingPane/Content/CourseDetails/CourseDetails.js';
import styles from './PlannerPage.module.css'

function PlannerContent() {
    const { isPaneOpen, closePane, selectedCourse } = useCourse();

    const renderPane = () => {
        if (!isPaneOpen) return null;
        return (
            <SlidingPane isOpen={isPaneOpen} onClose={closePane}>
                <CourseDetails course={selectedCourse} />
            </SlidingPane>
        );
    };

    return (
        <div className={styles.plannerPage}>
            <div className={styles.actions}>
                <div className={styles.searchBox}> <SearchBox /> </div>
                <div className={styles.actionMenu}> <ActionMenu /> </div>
            </div>
            <div className={styles.semesterGrid}> <SemesterGrid /> </div>
            {renderPane()}
        </div>
    );
}

function PlannerPage() {
    return (
        <PlannerContent />
    );
}

export default PlannerPage;