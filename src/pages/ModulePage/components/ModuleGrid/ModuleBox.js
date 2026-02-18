import styles from './ModuleGrid.module.css'
import CourseGrid from '../../../PlannerPage/components/SemesterGrid/CourseGrid'
import {Label, Text} from "@primer/react";
import React from "react";
import IssueAlert from "../../../../components/issue/IssueAlert";

function ModuleBox({ module, courses = [], issues = [], onCourseDrag, onCourseDrop  }) {

    const totalEap = courses.reduce((sum, course) => sum + (course.credits || 0), 0);

    const curriculumEap = courses.reduce((acc, course) => {
        const curriculum = course.curriculum || 'Määramata';
        acc[curriculum] = (acc[curriculum] || 0) + (course.credits || 0);
        return acc;
    }, {});

    const handleDrop = (event) => {
        event.preventDefault();
        try {
            const data = JSON.parse(event.dataTransfer.getData("application/json"));
            if (onCourseDrop) {
                onCourseDrop(data);
            }
        } catch (error) {
            console.error('Failed to parse drop data:', error);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };

    const renderIssues = () => {
        if (issues.length === 0) return null;

        return (
            <div className={styles.issues}>
                {issues.map((submoduleGroup, index) => (
                    <IssueAlert
                        key={index}
                        type="danger"
                        heading={`${submoduleGroup.submoduleTitle} (${submoduleGroup.missing.length} puudu):`}
                        courseCodes={submoduleGroup.missing.map(course => course.code)}
                    />
                ))}
            </div>
        );
    };


    const renderLabels = () => (
        <div className={styles.labels}>
            {module.code &&
                <Label
                    variant={'secondary'}
                    title={'Mooduli kood'}
                >
                    {module.code}
                </Label>}

            <Label
                variant={'secondary'}
                title={'Planeeritud EAP hulk'}
            >
                {totalEap} EAP
            </Label>
        </div>
    );

    const renderCurricula = () => (
        <div className={styles.curricula}>
            {Object.entries(curriculumEap).map(([curriculum, eap]) => (
                <div key={curriculum} className={styles.curriculumItem}>
                    <Text weight={'semibold'}>{curriculum}</Text>
                    <Text size={'small'} className={styles.eap}>{eap} EAP</Text>
                </div>
            ))}
        </div>
    );


    return (
        <div
            className={styles.moduleBox}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <div className={styles.courses}>
                <CourseGrid
                    courses={courses}
                    onCourseDrag={ onCourseDrag }
                />
            </div>
            <div className={styles.content}>

                <div>
                    <h3>{module.title}</h3>
                    {renderLabels()}
                </div>

                {renderCurricula()}
                {renderIssues()}

            </div>
        </div>
    );
}

export default ModuleBox;