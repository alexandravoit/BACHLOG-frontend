import { useRef, useState } from 'react';
import { IconButton } from '@primer/react';
import { UploadIcon } from '@primer/octicons-react';
import { parseCsv } from "../../../../../api/CoursesApi";
import { useCourse } from '../../../../../context';
import UploadDialog from "../UploadDialog";

function FileUploader() {
    const [isUploading, setIsUploading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [uploadResults, setUploadResults] = useState(null);
    const fileInputRef = useRef(null);
    const { loadAllCourses } = useCourse();

    const handleButtonClick = () => {
        if (isUploading) return;
        fileInputRef.current?.click();
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsUploading(true);

        try {
            const results = await parseCsv(file);
            setUploadResults(results);
            console.log(results);
            setShowResults(true);
            await loadAllCourses();
        } catch (error) {
            setUploadResults({
                processed: 0,
                succeeded: 0,
                failed: 0,
                error: error?.message || 'Tundmatu viga'
            });
            setShowResults(true);
        } finally {
            setIsUploading(false);
            event.target.value = '';
        }
    };

    const handleCloseDialog = () => {
        setShowResults(false);
        setUploadResults(null);
    };

    return (
        <div>
            <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                disabled={isUploading}
                style={{ display: 'none' }}
                id="csv-upload-input"
            />
            <IconButton
                icon={UploadIcon}
                size="small"
                variant="invisible"
                aria-label="Lae üles .csv failina"
                tooltipDirection="s"
                disabled={isUploading}
                onClick={handleButtonClick}
            />
            <UploadDialog
                open={showResults}
                results={uploadResults}
                onClose={handleCloseDialog}
            />
        </div>
    );
}
export default FileUploader;