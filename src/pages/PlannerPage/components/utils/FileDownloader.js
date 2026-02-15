import { IconButton } from '@primer/react';
import { DownloadIcon } from '@primer/octicons-react';

function FileDownloader() {

    return (
        <div>
            <IconButton
                icon={DownloadIcon}
                size="small"
                variant="invisible"
                aria-label="Lae alla .csv failina"
                tooltipDirection="s"
            />
        </div>
    );
}
export default FileDownloader;