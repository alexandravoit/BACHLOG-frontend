import {IconButton} from "@primer/react";
import {CheckIcon} from "@primer/octicons-react";
import {useModules} from "../../../../context/ModuleContext";

function ModulesChecker() {

    const { validateModules, selectedYear } = useModules();

    const handleCheck = async () => {
        try {
            await validateModules(2476, selectedYear);
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
                tooltipDirection="n"
                onClick={handleCheck}
            />
        </div>
    );
}
export default ModulesChecker;