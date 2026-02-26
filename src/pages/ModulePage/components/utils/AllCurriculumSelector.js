import React, { useEffect, useState } from 'react';
import { FormControl, Select, Tooltip } from '@primer/react';
import { getAllCurricula } from '../../../../api/CoursesApi';

export default function AllCurriculumSelector({ value, onChange }) {
    const [curricula, setCurricula] = useState([]);
    const [selected, setSelected] = useState(value || '');

    useEffect(() => {
        const fetchCurricula = async () => {
            try {
                const data = await getAllCurricula();
                setCurricula(data);
            } catch (err) {
                console.error('Failed to fetch curricula:', err);
            }
        };
        fetchCurricula();
    }, []);

    useEffect(() => {
        if (value !== undefined) {
            setSelected(value);
        }
    }, [value]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelected(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <FormControl>
            <FormControl.Label visuallyHidden></FormControl.Label>
            <Tooltip text='Õppekava' direction="s">
                <Select
                    size='small'
                    sx={{
                        width: 65,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                    value={selected}
                    onChange={handleChange}
                >
                    {curricula.map((c) => (
                        <Select.Option key={c.code} value={c.code}>
                            {c.title}
                        </Select.Option>
                    ))}
                </Select>
            </Tooltip>
        </FormControl>
    );
}