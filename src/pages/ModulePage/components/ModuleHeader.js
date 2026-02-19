import React from "react";
import styles from '../ModulePage.module.css';
import {FormControl, Select} from "@primer/react";
import ModulesChecker from "./utils/ModulesChecker";
import {useModules} from "../../../context/ModuleContext";
import CurriculumSelector from "../../../components/utils/CurriculumSelector";

function ModuleHeader() {
    const { years, selectedYear, setSelectedYear, selectedCurriculum, setSelectedCurriculum } = useModules();

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    return (
        <div className={styles.moduleHeader}>
            <h1>Moodulid</h1>
            <CurriculumSelector
                mode="all"
                value={selectedCurriculum}
                onChange={setSelectedCurriculum}
                label="Õppekava"
            />
            <FormControl>
                <FormControl.Label visuallyHidden={true}>Aasta</FormControl.Label>
                <Select
                    size="small"
                    value={selectedYear}
                    onChange={handleYearChange}
                    title={'Õppekava versioon'}
                >
                    {years.map(year => (
                        <Select.Option key={year} value={year}>
                            {year}
                        </Select.Option>
                    ))}
                </Select>
            </FormControl>
            <ModulesChecker year={selectedYear} />
        </div>
    );
}
export default ModuleHeader;