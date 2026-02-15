import { useRef, useState } from 'react';
import { IconButton } from '@primer/react';
import { UploadIcon } from '@primer/octicons-react';
import { parseCsv } from "../../../../api/CoursesApi";
import { useCourse } from '../../../../context';

function FileUploader() {
    const [isUploading, setIsUploading] = useState(false);
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
            console.log('Upload successful:', results);
            await loadAllCourses();
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Faili üleslaadimine ebaõnnestus: ' + (error?.message));
        } finally {
            setIsUploading(false);
            event.target.value = '';
        }
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
        </div>
    );
}
export default FileUploader;