import styles from './ModuleGrid.module.css'
import ModuleBox from "./ModuleBox";
import OverviewBox from "./OverviewBox";
import {useModules} from "../../../../context/ModuleContext";

function ModuleGrid() {

    const { modules, validationResults } = useModules();

    const getIssuesForModule = (module) => {
        const moduleResults = Object.values(validationResults)
            .filter(result => result.code === module.code);

        return moduleResults.flatMap(result => result.missing || []);
    };

    return (
        <div className={styles.moduleGrid}>
            <OverviewBox
            />
            {Object.values(modules).map((module) => (
                <ModuleBox
                    key={module.code}
                    module={module}
                    courses={module.courses || []}
                    issues={getIssuesForModule(module)}
                />
            ))}
        </div>
    )
}
export default ModuleGrid;