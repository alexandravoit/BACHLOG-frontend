import styles from './ActionMenu.module.css'
import PlanChecker from "../utils/PlanChecker";
import FileUploader from "../utils/FileUploader";

function ActionMenu() {
    return (
        <div className={styles.actionMenu}>
            <p className={styles.actionMenuHeader}>Toimingud</p>

            <div className={styles.actionMenuItems}>
                <PlanChecker />
                <FileUploader />
                <PlanChecker />
                <FileUploader />
            </div>

        </div>
    )
}
export default ActionMenu;