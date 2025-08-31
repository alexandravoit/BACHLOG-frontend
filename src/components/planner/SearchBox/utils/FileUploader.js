import { useState } from 'react';
import { IconButton } from '@primer/react';
import { UploadIcon } from '@primer/octicons-react';

function FileUploader() {
  return (
    <div>
      <IconButton
        icon={UploadIcon}
        size="small"
        variant="invisible"
        aria-label="Lae .csv failina"
        tooltipDirection='n'
      />
    </div>
  );
}
export default FileUploader;