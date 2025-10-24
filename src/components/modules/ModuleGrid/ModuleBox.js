import styles from './ModuleGrid.module.css'
import CourseGrid from '../../planner/SemesterGrid/CourseGrid'
import {Label, Text} from "@primer/react";
import React from "react";
import {AlertIcon} from "@primer/octicons-react";

function ModuleBox({ module, courses = [], issues = []  }) {

    const totalEap = courses.reduce((sum, course) => sum + (course.credits || 0), 0);

    const curriculumEap = courses.reduce((acc, course) => {
        const curriculum = course.curriculum || 'Määramata';
        acc[curriculum] = (acc[curriculum] || 0) + (course.credits || 0);
        return acc;
    }, {});

    const renderIssues = () => {
        if (issues.length === 0) return null;

        return (
            <div className={styles.issues}>
                <div className={styles.issue}>
                    <div className={styles.issueTitle}>
                        <AlertIcon size={12}/>
                        <Text size={'small'} weight="semibold">
                            Aineid puudu: {issues.length}
                        </Text>
                    </div>
                    <Text size={'small'}>
                        {issues.map(course => course.code).join(', ')}
                    </Text>
                </div>
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
            {module.minEap &&
                <Label
                    variant={'secondary'}
                    title={'Miinimum EAP hulk'}
                >
                    {module.minEap} EAP
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
        <div className={styles.moduleBox}>
            <div className={styles.courses}>
                <CourseGrid courses={courses} />
            </div>
            <div className={styles.content}>
                <h3>{module.title}</h3>

                {renderLabels()}

                {renderCurricula()}

                {renderIssues()}
            </div>
        </div>
    );
}

export default ModuleBox;