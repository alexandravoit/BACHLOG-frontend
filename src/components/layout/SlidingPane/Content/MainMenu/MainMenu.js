import {ActionList, Button} from "@primer/react";
import styles from './MainMenu.module.css'
import { deleteAllCourses} from "../../../../../api/CoursesApi";
import {useCourse} from "../../../../../context";

function MainMenu() {
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
        <div className={styles.mainMenu}>

            <div className={styles.mainMenuActions}>
                <ActionList showDividers sx={{ margin: '-16px' }}>
                    <ActionList.LinkItem href="/">Avaleht</ActionList.LinkItem>
                    <ActionList.LinkItem href="/modules">Moodulid</ActionList.LinkItem>
                    <ActionList.LinkItem href="/planner">Planeerija</ActionList.LinkItem>
                </ActionList>
            </div>


            <div className={styles.mainMenuFooter}>
                <Button
                    variant="danger"
                    size="small"
                    onClick={handleDeleteAll}
                >
                    Kustuta kõik
                </Button>
            </div>

        </div>
    );
}

export default MainMenu;
