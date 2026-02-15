import { useState } from 'react';
import { useCourse } from '../../context';
import SemesterGrid from './components/SemesterGrid/SemesterGrid.js';
import SearchBox from './components/SearchBox/SearchBox.js';
import SearchResultBox from './components/SearchBox/SearchResultBox.js';
import ActionMenu from './components/ActionMenu/ActionMenu.js';
import SlidingPane from '../../components/layout/SlidingPane/SlidingPane.js';
import CourseDetails from '../../components/layout/SlidingPane/Content/CourseDetails/CourseDetails.js';
import styles from './PlannerPage.module.css'

function PlannerContent() {
    const { isPaneOpen, closePane, selectedCourse } = useCourse();
    const [searchResults, setSearchResults] = useState([]);

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
                <div className={styles.searchBox}>
                    <SearchBox onSearchResults={setSearchResults} />
                </div>
                <div>
                    <ActionMenu />
                </div>
            </div>

            {searchResults.length > 0 && (
                <div className={styles.searchResults}>
                    <SearchResultBox courses={searchResults} />
                </div>
            )}

            <div className={styles.semesterGrid}>
                <SemesterGrid />
            </div>
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