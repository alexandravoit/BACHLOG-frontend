import {Button} from "@primer/react";
import {useCourse} from "../../../../../../context";

export default function DeleteCourse({ course }) {

    const { deleteCourse } = useCourse();

    const handleDeleteCourse = async () => {
        if (window.confirm('Kas olete kindel, et soovite kursust kustutada?')) {
            try {
                await deleteCourse(course.id);
            } catch (err) {
                alert('Kursuse kustutamine ebaõnnestus.');
            }
        }
    };

    return (
        <Button
            variant="danger"
            size="small"
            onClick={handleDeleteCourse}
        >
            Kustuta kursus
        </Button>
    )
}