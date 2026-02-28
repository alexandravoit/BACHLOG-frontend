import React from 'react';
import styles from './CourseDetails.module.css';
import globalStyles from '../../../../../global.module.css';
import { Label, Text } from '@primer/react';
import { getCourseLabels } from "../../../../../utils/CourseUtils";
import { useCourse } from '../../../../../context';
import ModuleSelector from "./utils/ModuleSelector";
import DeleteCourse from "./utils/DeleteCourse";
import IssueAlert from "../../../../issue/IssueAlert";
import CourseCurriculumSelector from "./utils/CourseCurriculumSelector";

function CourseDetails({ course }) {
    const { courses, getCourseIssues } = useCourse();
    const courseData = courses[course.id] || course;
    const labels = getCourseLabels(courseData);
    const issues = getCourseIssues(courseData.id);

    const handleCourseCodeClick = () => {
        const url = `https://ois2.ut.ee/#/courses/${course.code}`;
        window.open(url, '_blank');
    };

    const renderIssues = () => {
        if (issues.ok) return null;

        return (
            <div className={styles.issues}>
                {issues.issues.map((issue, index) => (
                    <React.Fragment key={index}>
                        <IssueAlert
                            type="danger"
                            heading={issue.type}
                            message={issue.message}
                        />
                        {issue.prereqs && (
                            <IssueAlert
                                type="warning"
                                heading="Eeldusained"
                                message="Planeeri vähemalt üks järgmistest ainetest:"
                                courseCodes={issue.prereqs}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.courseDetails}>
            <div className={styles.header}>
                <Text size={'large'} weight={'semibold'}>{course.title}</Text>
                <Text
                    onClick={handleCourseCodeClick}
                    className={styles.courseCodeLink}
                >
                    {courseData.code}
                </Text>
            </div>

            <div className={styles.labels}>
                {labels.map(label => (
                    <Label key={label.id} variant={label.variant}>
                        {label.content}
                    </Label>
                ))}
            </div>

            {renderIssues()}

            <div className={globalStyles.divider} />

            <div className={styles.selectors}>
                <div className={styles.selector}>
                    <Text size={'small'} weight={'semibold'}>Õppekava</Text>
                    <CourseCurriculumSelector course={courseData} />
                </div>
                <div className={styles.selector}>
                    <Text size={'small'} weight={'semibold'}>Moodul</Text>
                    <ModuleSelector course={courseData} />
                </div>
            </div>

            <div className={styles.courseDetailsFooter}>
                <DeleteCourse course={courseData} />
            </div>
        </div>
    );
}

export default CourseDetails;