import React, { useEffect, useState } from "react";
import { FormControl, Select } from "@primer/react";
import { getModuleOptions } from "../../../../../api/ModulesApi";
import { updateCourseModule } from "../../../../../api/CoursesApi";

export default function ModuleSelector({ course, onModuleUpdated }) {
    const [modules, setModules] = useState([{ code: course.module, title: course.module }]);
    const [selected, setSelected] = useState(course.module || "");

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const data = await getModuleOptions();
                setModules(data || []);
            } catch (err) {
                console.error("Failed to fetch modules:", err);
            }
        };
        fetchModules();
    }, []);

    const handleChange = async (event) => {
        const newModule = event.target.value || null;
        setSelected(newModule);
        try {
            await updateCourseModule(course.id, newModule);
            if (onModuleUpdated) {
                await onModuleUpdated(course.id);
            }
        } catch (err) {
            console.error("Failed to update module:", err);
        }
    };

    return (
        <FormControl>
            <FormControl.Label visuallyHidden>Moodul</FormControl.Label>
            <Select
                size="small"
                sx={{ width: "100%" }}
                value={selected ?? ''}
                onChange={handleChange}
            >
                {modules.map((m) => (
                    <Select.Option
                        key={m.code ?? "none"}
                        value={m.code ?? ""}
                    >
                        {m.title}
                    </Select.Option>
                ))}
            </Select>
        </FormControl>
    );
}
