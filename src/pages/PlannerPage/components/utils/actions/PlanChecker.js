import { IconButton } from '@primer/react';
import { CheckIcon } from '@primer/octicons-react';
import { useCourse } from '../../../../../context';
import InfoDialog from "../../../../../components/utils/InfoDialog";
import {useState} from "react";


function PlanChecker() {

    const { validateCourses, validationResults } = useCourse();
    const [checkFailed, setCheckFailed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleCheck = async () => {
        try {
            await validateCourses();
            setCheckFailed(false);
            setIsOpen(true);
        } catch (error) {
            console.error('Validation check failed:', error);
            setCheckFailed(true);
            setIsOpen(true);
        }
    };

    const results = Object.values(Object(validationResults));
    const failed = results.filter(r => !r.ok);
    const issueCount = failed.length;
    const failedCodes = failed.map(r => r.code);

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
                type={checkFailed ? 'danger' : issueCount === 0 ? 'success' : 'warning'}
                heading={checkFailed ? 'Kontroll ebaõnnestus.' : issueCount === 0 ? 'Probleeme ei leitud!' : `Probleem leitud ${issueCount} kursusega!`}
                message={checkFailed ? '' : issueCount === 0 ? '' : 'Probleemsed kursused:'}
                courseCodes={checkFailed ? [] : failedCodes}
            />
        </div>
    );
}
export default PlanChecker;