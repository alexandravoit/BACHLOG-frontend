import {ActionList} from "@primer/react";
import styles from './MainMenu.module.css'

function MainMenu() {
    return (
        <div className={styles.mainMenu}>

            <div className={styles.mainMenuActions}>
                <ActionList showDividers sx={{ margin: '-16px' }}>
                    <ActionList.LinkItem href="/">Avaleht</ActionList.LinkItem>
                    <ActionList.LinkItem href="/semesters">Semestrid</ActionList.LinkItem>
                    <ActionList.LinkItem href="/modules">Moodulid</ActionList.LinkItem>
                </ActionList>
            </div>
        </div>
    );
}

export default MainMenu;
