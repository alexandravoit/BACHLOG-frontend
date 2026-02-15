import { IconButton } from '@primer/react';
import { CheckIcon } from '@primer/octicons-react';
import { useCourse } from '../../../../context';


function PlanChecker() {

    const { validateCourses } = useCourse();

    const handleCheck = async () => {
        try {
            validateCourses();
        } catch (error) {
            console.error('Validation check failed:', error);
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
export default PlanChecker;