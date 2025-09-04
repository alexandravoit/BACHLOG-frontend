import { useRef, useState } from 'react';
import { IconButton } from '@primer/react';
import { UploadIcon } from '@primer/octicons-react';
import { parseCsv } from "../../../../api/CoursesApi";

function FileUploader() {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

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
                aria-label="Lae .csv failina"
                tooltipDirection="n"
                disabled={isUploading}
                onClick={handleButtonClick}
            />
        </div>
    );
}
export default FileUploader;