import React from "react";
import styles from '../ModulePage.module.css';
import {FormControl, Select, Tooltip} from "@primer/react";
import ModulesChecker from "./utils/ModulesChecker";
import {useModules} from "../../../context/ModuleContext";
import TutorialDialog from "../../../components/utils/TutorialDialog";
import AllCurriculumSelector from "./utils/AllCurriculumSelector";
import ModulesGuide from "../../../components/guides/ModuleGuide";

function ModuleHeader() {
    const { years, selectedYear, setSelectedYear, selectedCurriculum, setSelectedCurriculum } = useModules();

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    return (
        <div className={styles.moduleHeader}>
            <h1>Moodulid</h1>

            <AllCurriculumSelector
                value={selectedCurriculum}
                onChange={setSelectedCurriculum}
            />

            <FormControl>
                <FormControl.Label visuallyHidden={true}>Aasta</FormControl.Label>

                <Tooltip text="Õppekava versioon" direction="s">
                    <Select
                        size="small"
                        value={selectedYear}
                        onChange={handleYearChange}
                    >
                        {years.map(year => (
                            <Select.Option key={year} value={year}>
                                {year}
                            </Select.Option>
                        ))}
                    </Select>
                </Tooltip>
            </FormControl>

            <ModulesChecker year={selectedYear} />

            <TutorialDialog title='MOODULID'>
                <ModulesGuide />
            </TutorialDialog>
        </div>
    );
}
export default ModuleHeader;