import { useState } from 'react';
import { IconButton } from '@primer/react';
import { CheckIcon } from '@primer/octicons-react';

function PlanChecker() {
  return (
    <div>
      <IconButton
        icon={CheckIcon}
        size="small"
        variant="invisible"
        aria-label="Kontrolli"
        tooltipDirection="n"
      />
    </div>
  );
}
export default PlanChecker;