import { IconButton } from '@primer/react';
import { DownloadIcon } from '@primer/octicons-react';
import {exportCsv} from "../../../../../api/CoursesApi";
import {useCourse} from "../../../../../context";
import {useState} from "react";
import InfoDialog from "../../../../../components/utils/InfoDialog";

function FileDownloader() {
    const { courses } = useCourse();
    const [isOpen, setIsOpen] = useState(false);
    const [unassigned, setUnassigned] = useState([]);

    const handleExport = async () => {
        const missing = Object.values(courses).filter(c => !c.module);

        if (missing.length > 0) {
            setUnassigned(missing);
            setIsOpen(true);
            return;
        }

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
            <InfoDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Eksport ebaõnnestus"
                type="danger"
                heading="Enne eksporti tuleb kõik kursused määrata moodulisse!"
                message="Määramata kursused:"
                courseCodes={unassigned.map(c => c.code)}
            />
        </div>
    );
}
export default FileDownloader;