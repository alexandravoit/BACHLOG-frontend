import { IconButton } from '@primer/react';
import { TrashIcon } from '@primer/octicons-react';
import { useCourse } from '../../../../../context';

function DeleteAll() {

    const { deleteAllCourses } = useCourse();

    const handleDeleteAll = () => {
        if (window.confirm('Kas olete kindel, et soovite kõik kursused kustutada?')) {
            deleteAllCourses();
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