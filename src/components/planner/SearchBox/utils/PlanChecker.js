import { IconButton } from '@primer/react';
import { CheckIcon } from '@primer/octicons-react';
import {checkCourses} from "../../../../api/CoursesApi";

function PlanChecker() {
  return (
    <div>
      <IconButton
        icon={CheckIcon}
        size="small"
        variant="invisible"
        aria-label="Kontrolli"
        tooltipDirection="n"
        onClick={checkCourses}
      />
    </div>
  );
}
export default PlanChecker;