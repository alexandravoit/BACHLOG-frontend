import { IconButton } from '@primer/react';
import { TrashIcon } from '@primer/octicons-react';
import { useCourse } from '../../../../context';
import {deleteAllCourses} from "../../../../api/CoursesApi";


function DeleteAll() {

    const { loadAllCourses } = useCourse();

    const handleDeleteAll = async () => {
        if (window.confirm('Kas olete kindel, et soovite kõik kursused kustutada?')) {
            try {
                await deleteAllCourses();
                await loadAllCourses();
            } catch (err) {
                alert('Kursuste kustutamine ebaõnnestus.');
            }
        }
    };

    return (
        <div>
            <IconButton
                icon={TrashIcon}
                size="small"
                variant="invisible"
                aria-label="Kustuta kõik"
                tooltipDirection="s"
                onClick={handleDeleteAll}
            />
        </div>
    );
}
export default DeleteAll;