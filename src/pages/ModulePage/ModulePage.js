import React from "react";
import { ModuleProvider } from "../../context/ModuleContext";
import ModuleHeader from "./components/ModuleHeader";
import ModuleGrid from "./components/ModuleGrid/ModuleGrid";
import SlidingPane from "../../components/layout/SlidingPane/SlidingPane";
import CourseDetails from "../../components/layout/SlidingPane/Content/CourseDetails/CourseDetails";
import { useCourse } from "../../context";
import styles from "./ModulePage.module.css";
import globalStyles from "../../global.module.css";

function ModulesPageContent() {
    const { isPaneOpen, closePane, selectedCourse } = useCourse();

    return (
        <div className={styles.modulePage}>
            <ModuleHeader />
            <div className={globalStyles.divider} />
            <ModuleGrid />
            {isPaneOpen && (
                <SlidingPane isOpen={isPaneOpen} onClose={closePane}>
                    <CourseDetails course={selectedCourse} />
                </SlidingPane>
            )}
        </div>
    );
}

export default function ModulePage() {
    return (
        <ModuleProvider>
            <ModulesPageContent />
        </ModuleProvider>
    );
}
