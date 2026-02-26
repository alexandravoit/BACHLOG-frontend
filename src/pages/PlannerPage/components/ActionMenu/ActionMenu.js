import styles from './ActionMenu.module.css'
import PlanChecker from "../utils/actions/PlanChecker";
import FileUploader from "../utils/actions/FileUploader";
import DeleteAll from "../utils/actions/DeleteAll";
import FileDownloader from "../utils/actions/FileDownloader";
import TutorialDialog from "../../../../components/utils/TutorialDialog";
import PlannerGuide from "../../../../components/guides/PlannerGuide";

function ActionMenu() {
    return (
        <div className={styles.actionMenu}>
            <p className={styles.actionMenuHeader}>Toimingud</p>

            <div className={styles.actionMenuItems}>
                <PlanChecker />
                <FileUploader />
                <DeleteAll />
                <FileDownloader />

                <TutorialDialog title='SEMESTRID'>
                    <PlannerGuide />
                </TutorialDialog>
            </div>

        </div>
    )
}
export default ActionMenu;