import { useState } from 'react';
import { useCourse } from '../../context';
import SemesterGrid from './components/SemesterGrid/SemesterGrid.js';
import SearchBox from './components/SearchBox/SearchBox.js';
import SearchResultBox from './components/SearchBox/SearchResultBox.js';
import ActionMenu from './components/ActionMenu/ActionMenu.js';
import CourseDetails from '../../components/layout/SlidingPane/Content/CourseDetails/CourseDetails.js';
import styles from './PlannerPage.module.css'
import DialogPane from "../../components/layout/SlidingPane/DialogPane";

function PlannerContent() {
    const { isPaneOpen, closePane, selectedCourse } = useCourse();
    const [searchResults, setSearchResults] = useState([]);

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

            <DialogPane isOpen={isPaneOpen} onClose={closePane}>
                {selectedCourse && <CourseDetails course={selectedCourse} />}
            </DialogPane>
        </div>
    );
}

function PlannerPage() {
    return (
        <PlannerContent />
    );
}

export default PlannerPage;