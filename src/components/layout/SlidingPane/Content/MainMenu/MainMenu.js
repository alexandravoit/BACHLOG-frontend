import {ActionList} from "@primer/react";
import styles from './MainMenu.module.css'

function MainMenu() {
    return (
        <div className={styles.mainMenu}>
            <ActionList showDividers sx={{ margin: '-16px' }}>
                <ActionList.LinkItem href="/">Avaleht</ActionList.LinkItem>
                <ActionList.LinkItem href="/modules">Moodulid</ActionList.LinkItem>
                <ActionList.LinkItem href="/planner">Planeerija</ActionList.LinkItem>
            </ActionList>
        </div>
    );
}

export default MainMenu;
