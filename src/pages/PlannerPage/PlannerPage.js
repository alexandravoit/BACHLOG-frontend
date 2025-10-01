import { CourseProvider, useCourse } from '../../context';
import SemesterGrid from '../../components/planner/SemesterGrid/SemesterGrid.js';
import SearchBox from '../../components/planner/SearchBox/SearchBox.js';
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
            <div className={styles.searchBox}> <SearchBox /> </div>
            <div className={styles.semesterGrid}> <SemesterGrid /> </div>
            {renderPane()}
        </div>
    );
}

function PlannerPage() {
    return (
        <CourseProvider>
            <PlannerContent />
        </CourseProvider>
    );
}

export default PlannerPage;