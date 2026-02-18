import styles from './ModuleGrid.module.css'
import {useCourse} from "../../../../context";
import React from "react";
import {Text} from "@primer/react";
import {useModules} from "../../../../context/ModuleContext";
import IssueAlert from "../../../../components/issue/IssueAlert";

function OverviewBox() {
    const { courses } = useCourse();
    const { validationResults, moduleOptions, warnings } = useModules();

    const totalEap = Object.values(courses).reduce((sum, course) => {
        return sum + (course.credits || 0);
    }, 0);

    const problematicModules = Object.values(validationResults).filter(module => !module.ok);
    const problematicModuleTitles = problematicModules.map(validationModule => {
        const option = moduleOptions.find(opt => opt.code === validationModule.code);
        return option?.title || validationModule.code;
    });

    const renderModuleProblems = () => {
        if (problematicModuleTitles.length === 0) return null;

        return (
                <IssueAlert
                    type="danger"
                    heading={`Kursused puudu ${problematicModuleTitles.length} moodulist:`}
                    message={problematicModuleTitles.join(', ')}
                />
        );
    };

    const renderWarnings = () => {
        const warningAlerts = [];

        // Multiples
        if (warnings.doubled && warnings.doubled.length > 0) {
            const count = warnings.doubled.length;
            warningAlerts.push(
                <IssueAlert
                    key="doubled"
                    type="info"
                    heading={`${count} ${count === 1 ? 'kursus' : 'kursust'} planeeritud mitu korda:`}
                    courseCodes={warnings.doubled.map(c => c.code)}
                />
            );
        }

        // Misplaced
        if (warnings.misplaced && warnings.misplaced.length > 0) {
            warnings.misplaced.forEach((misplaced, index) => {
                warningAlerts.push(
                    <IssueAlert
                        key={`misplaced-${index}`}
                        type="warning"
                        heading={`${misplaced.code} vales moodulis:`}
                        message={misplaced.reason}
                    />
                );
            });
        }


        return warningAlerts.length > 0 ? (
            <div className={styles.warnings}>
                {warningAlerts}
            </div>
        ) : null;
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

                <div className={styles.issues}>
                    {renderModuleProblems()}
                    {renderWarnings()}
                </div>

            </div>
        </div>
    );
}

export default OverviewBox;