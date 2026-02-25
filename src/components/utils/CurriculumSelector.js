import React, { useEffect, useState } from 'react';
import { FormControl, Select } from '@primer/react';
import { getCourseCurricula, updateCourseCurriculum, getAllCurricula } from '../../api/CoursesApi';

export default function CurriculumSelector({
       course,
       onCurriculumUpdated,
       mode = 'course', // 'course' or 'all'
       value,
       onChange,
       label = 'Õppekava'
   }) {
    const [curricula, setCurricula] = useState([]);
    const [selected, setSelected] = useState(value || course?.curriculum || '');

    useEffect(() => {
        const fetchCurricula = async () => {
            try {
                if (mode === 'all') {
                    const data = await getAllCurricula();
                    setCurricula(data);
                } else if (course) {
                    const data = await getCourseCurricula(course.uuid);
                    const uniqueCurricula = Array.from(new Set([course.curriculum, ...(data.curricula || [])]));
                    setCurricula(uniqueCurricula.map(title => ({ title, code: null })));
                }
            } catch (err) {
                console.error('Failed to fetch curricula:', err);
            }
        };
        fetchCurricula();
    }, [course, mode]);

    useEffect(() => {
        if (value !== undefined) {
            setSelected(value);
        }
    }, [value]);

    const handleChange = async (event) => {
        const newValue = event.target.value;
        setSelected(newValue);

        if (mode === 'all') {
            if (onChange) {
                onChange(newValue);
            }
        } else if (course) {
            try {
                await updateCourseCurriculum(course.id, newValue);
                if (onCurriculumUpdated) {
                    await onCurriculumUpdated(course.id);
                }
            } catch (err) {
                console.error('Failed to update curriculum:', err);
            }
        }
    };

    return (
        <FormControl>
            <FormControl.Label visuallyHidden>{label}</FormControl.Label>
            <Select
                size='small'
                sx={
                    mode === 'course'
                        ? { width: '100%' }
                        : {
                            width: 65,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }
                }
                value={selected}
                onChange={handleChange}
                title={label}
            >
                {mode === 'all'
                    ? curricula.map((c) => (
                        <Select.Option key={c.code} value={c.code}>
                            {c.title}
                        </Select.Option>
                    ))
                    : curricula.map((c) => (
                        <Select.Option key={c.title} value={c.title}>
                            {c.title}
                        </Select.Option>
                    ))
                }
            </Select>
        </FormControl>
    );
}