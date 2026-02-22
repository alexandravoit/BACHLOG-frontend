import { IconButton } from '@primer/react';
import { DownloadIcon } from '@primer/octicons-react';
import {exportCsv} from "../../../../../api/CoursesApi";

function FileDownloader() {

    const handleExport = async () => {
        try {
            await exportCsv();
        } catch (error) {
            console.error('Export failed:', error);
        }
    };

    return (
        <div>
            <IconButton
                icon={DownloadIcon}
                size="small"
                variant="invisible"
                aria-label="Lae alla .csv failina"
                tooltipDirection="s"
                onClick={handleExport}
            />
        </div>
    );
}
export default FileDownloader;