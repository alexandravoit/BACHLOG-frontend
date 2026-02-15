import styles from './ActionMenu.module.css'
import PlanChecker from "../utils/PlanChecker";
import FileUploader from "../utils/FileUploader";
import DeleteAll from "../utils/DeleteAll";
import FileDownloader from "../utils/FileDownloader";

function ActionMenu() {
    return (
        <div className={styles.actionMenu}>
            <p className={styles.actionMenuHeader}>Toimingud</p>

            <div className={styles.actionMenuItems}>
                <PlanChecker />
                <FileUploader />
                <DeleteAll />
                <FileDownloader />
            </div>

        </div>
    )
}
export default ActionMenu;