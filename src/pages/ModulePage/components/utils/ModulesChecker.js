import {IconButton} from "@primer/react";
import {CheckIcon} from "@primer/octicons-react";
import {useModules} from "../../../../context/ModuleContext";

function ModulesChecker() {

    const { validateModules, selectedYear, selectedCurriculum } = useModules();

    const handleCheck = async () => {
        try {
            await validateModules(selectedCurriculum, selectedYear);
        } catch (error) {
            console.error("Module validation failed:", error);
        }
    };

    return (
        <div>
            <IconButton
                icon={CheckIcon}
                size="small"
                variant="invisible"
                aria-label="Kontrolli"
                tooltipDirection="s"
                onClick={handleCheck}
            />
        </div>
    );
}
export default ModulesChecker;