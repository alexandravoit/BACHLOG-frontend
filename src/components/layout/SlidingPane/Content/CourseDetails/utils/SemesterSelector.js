import React, { useState } from "react";
import { FormControl, Select } from "@primer/react";
import { SEMESTER_TEMPLATE } from "../../../../../../constants/Semesters";
import { useCourse } from "../../../../../../context";

export default function SemesterSelector({ course }) {
    const [selected, setSelected] = useState(course.semester ?? SEMESTER_TEMPLATE[0].id);
    const { updateCourse } = useCourse();

    const handleChange = async (event) => {
        const newSemesterId = Number(event.target.value);
        setSelected(newSemesterId);
        try {
            await updateCourse(course.id, { semester: newSemesterId });
        } catch (err) {
            console.error("Failed to update semester:", err);
        }
    };

    return (
        <FormControl>
            <FormControl.Label visuallyHidden>Semester</FormControl.Label>
            <Select
                size="small"
                sx={{ width: "100%" }}
                value={selected}
                onChange={handleChange}
            >
                {SEMESTER_TEMPLATE.map((s) => (
                    <Select.Option key={s.id} value={s.id}>
                        {s.name}
                    </Select.Option>
                ))}
            </Select>
        </FormControl>
    );
}