import styles from './ModuleGrid.module.css'
import {useCourse} from "../../../../context";
import React from "react";
import {Text} from "@primer/react";
import {useModules} from "../../../../context/ModuleContext";
import IssueAlert from "../../../../components/issue/IssueAlert";

function OverviewBox() {
    const { courses } = useCourse();
    const { validationResults } = useModules();

    const totalEap = Object.values(courses).reduce((sum, course) => {
        return sum + (course.credits || 0);
    }, 0);

    const problematicModules = Object.values(validationResults).filter(module => !module.ok);
    const uniqueProblematicCodes = [...new Set(problematicModules.map(module => module.code))];

    const renderModuleProblems = () => {
        if (uniqueProblematicCodes.length === 0) return null;

        return (
            <div className={styles.issues}>
                <IssueAlert
                    type="danger"
                    heading={`Probleem ${uniqueProblematicCodes.length} mooduliga:`}
                    message={uniqueProblematicCodes.join(', ')}
                />
            </div>
        );
    };

    return (
        <div className={styles.moduleBox}>
            <div className={styles.content}>
                <h3>Ülevaade</h3>

                <div className={styles.curricula}>
                    <div className={styles.curriculumItem}>
                        <Text weight={'semibold'}>Kokku</Text>
                        <Text size={'small'} className={styles.eap}>{totalEap} EAP</Text>
                    </div>
                </div>

                {renderModuleProblems()}

            </div>
        </div>
    );
}

export default OverviewBox;