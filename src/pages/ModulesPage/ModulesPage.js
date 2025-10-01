import {CourseProvider, useCourse} from "../../context";
import SlidingPane from "../../components/layout/SlidingPane/SlidingPane";
import CourseDetails from "../../components/layout/SlidingPane/Content/CourseDetails/CourseDetails";
import styles from './ModulesPage.module.css'
import {Text} from "@primer/react";

function ModulesPage() {

    function ModulesPageContent() {
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
            <div className={styles.modulesPage}>
                <Text weight="semibold" size="large">Moodulid</Text>
                {renderPane()}
            </div>
        );
    }

    return (
        <CourseProvider>
            <ModulesPageContent />
        </CourseProvider>
    );
}

export default ModulesPage;