import {IconButton} from "@primer/react";
import {CheckIcon} from "@primer/octicons-react";
import {useModules} from "../../../../context/ModuleContext";
import {useState} from "react";
import InfoDialog from "../../../../components/utils/InfoDialog";

function ModulesChecker() {

    const { validateModules, selectedYear, selectedCurriculum, rawResults } = useModules();
    const [isOpen, setIsOpen] = useState(false);
    const [checkFailed, setCheckFailed] = useState(false);

    const handleCheck = async () => {
        try {
            await validateModules(selectedCurriculum, selectedYear);
            setCheckFailed(false);
            setIsOpen(true);
        } catch (error) {
            console.error('Module validation failed:', error);
            setCheckFailed(true);
            setIsOpen(true);
        }
    };

    const hasIssues = rawResults?.ok === false;

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
            <InfoDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={checkFailed ? '❌ Kontroll ebaõnnestus' : 'Kontrolli tulemus'}
                type={checkFailed ? 'danger' : hasIssues ? 'warning' : 'success'}
                heading={checkFailed ? 'Kontroll ebaõnnestus.' : hasIssues ? 'Probleemid leitud!' : 'Probleeme ei leitud!'}
                message={checkFailed ? '' : hasIssues ? 'Plaaniga seotud vead on nähtaval moodulite ülevaates.' : ''}
            />
        </div>
    );
}
export default ModulesChecker;