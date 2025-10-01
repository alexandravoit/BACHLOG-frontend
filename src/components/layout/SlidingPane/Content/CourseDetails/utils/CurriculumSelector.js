import React, { useEffect, useState } from 'react';
import { FormControl, Select } from '@primer/react';
import { getCourseCurricula, updateCourseCurriculum } from '../../../../../../api/CoursesApi';

export default function CurriculumSelector({ course, onCurriculumUpdated }) {
    const [curricula, setCurricula] = useState([course.curriculum]);
    const [selected, setSelected] = useState(course.curriculum || '');

    useEffect(() => {
        const fetchCurricula = async () => {
            try {
                const data = await getCourseCurricula(course.uuid);
                const uniqueCurricula = Array.from(new Set([course.curriculum, ...(data.curricula || [])]));
                setCurricula(uniqueCurricula);
            } catch (err) {
                console.error('Failed to fetch curricula:', err);
            }
        };
        fetchCurricula();
    }, [course.uuid, course.curriculum]);

    const handleChange = async (event) => {
        const newCurriculum = event.target.value;
        setSelected(newCurriculum);
        try {
            await updateCourseCurriculum(course.id, newCurriculum);
            if (onCurriculumUpdated) {
                await onCurriculumUpdated(course.id);
            }
        } catch (err) {
            console.error('Failed to update curriculum:', err);
        }
    };

    return (
        <FormControl>
            <FormControl.Label visuallyHidden>Õppekava</FormControl.Label>
            <Select size='small' sx={{ width: '100%' }} value={selected} onChange={handleChange}>
                {curricula.map((c) => (
                    <Select.Option key={c} value={c}>
                        {c}
                    </Select.Option>
                ))}
            </Select>
        </FormControl>
    );
}
