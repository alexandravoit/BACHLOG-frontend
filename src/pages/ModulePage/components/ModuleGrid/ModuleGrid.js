import styles from './ModuleGrid.module.css'
import ModuleBox from "./ModuleBox";
import OverviewBox from "./OverviewBox";
import {useModules} from "../../../../context/ModuleContext";
import {useCourse} from "../../../../context";
import {useDragAutoScroll} from "../../../../utils/CourseUtils";
import {calculateRequiredEap} from "../../../../utils/ModuleUtils";

function ModuleGrid() {

    const { modules, validationResults, rawResults } = useModules();
    const { updateCourse } = useCourse();

    useDragAutoScroll();

    const getIssuesForModule = (module) => {
        const moduleResult = validationResults[module.code];
        if (!moduleResult) return [];

        return moduleResult.submodules
             .filter(submodule => submodule.missing.length > 0)
             .map(submodule => ({
                 submoduleTitle: submodule.title,
                 missing: submodule.missing
             }));

    };

    const handleCourseDrag = (event, course, sourceModuleCode) => {
        event.dataTransfer.setData(
            "application/json",
            JSON.stringify({
                course: course,
                sourceModuleCode,
            })
        );
        event.dataTransfer.effectAllowed = "move";
    };

    const moveCourseToModule = async (targetModuleCode, course, sourceModuleCode) => {
        if (sourceModuleCode === targetModuleCode) return;

        try {
            await updateCourse(course.id, {
                module: targetModuleCode
            });
        } catch (error) {
            console.error('Failed to move course:', error);
        }
    };

    return (
        <div className={styles.moduleGrid}>
            <OverviewBox />
            {Object.values(modules).map((module) => (
                <ModuleBox
                    key={module.code}
                    module={module}
                    courses={module.courses || []}
                    requiredEap={calculateRequiredEap(module, rawResults)}
                    issues={getIssuesForModule(module)}
                    onCourseDrop={(courseData) => moveCourseToModule(module.code, courseData.course, courseData.sourceModuleCode)}
                    onCourseDrag={(event, course) => handleCourseDrag(event, course, module.code)}
                />
            ))}
        </div>
    )
}
export default ModuleGrid;