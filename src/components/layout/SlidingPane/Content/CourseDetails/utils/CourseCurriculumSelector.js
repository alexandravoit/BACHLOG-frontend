import React, { useEffect, useState } from 'react';
import { FormControl, Select } from '@primer/react';
import { getCourseCurricula } from '../../../../../../api/CoursesApi';
import {useCourse} from "../../../../../../context";

export default function CourseCurriculumSelector({ course }) {
    const [curricula, setCurricula] = useState([]);
    const [selected, setSelected] = useState(course?.curriculum || '');
    const { updateCourse } = useCourse();

    useEffect(() => {
        const fetchCurricula = async () => {
            if (!course) return;

            try {
                const data = await getCourseCurricula(course.uuid);
                const uniqueCurricula = Array.from(
                    new Set([course.curriculum, ...(data.curricula || [])])
                );
                setCurricula(uniqueCurricula.map(title => ({ title, code: null })));
            } catch (err) {
                console.error('Failed to fetch curricula:', err);
            }
        };
        fetchCurricula();
    }, [course]);

    const handleChange = async (event) => {
        const newValue = event.target.value;
        setSelected(newValue);

        try {
            await updateCourse(course.id, { curriculum: newValue });
        } catch (err) {
            console.error('Failed to update curriculum:', err);
        }
    };

    return (
        <FormControl>
            <FormControl.Label visuallyHidden></FormControl.Label>
            <Select
                size='small'
                sx={{ width: '100%' }}
                value={selected}
                onChange={handleChange}
            >
                {curricula.map((c) => (
                    <Select.Option key={c.title} value={c.title}>
                        {c.title}
                    </Select.Option>
                ))}
            </Select>
        </FormControl>
    );
}