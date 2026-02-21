import { Dialog } from '@primer/react';
import IssueAlert from "../../../../components/issue/IssueAlert";
import issueStyle from '../../../../global.module.css'

function UploadDialog({ open, results, onClose }) {
    if (!results) return null;

    const totalFailure = results.error;
    const partialFailure = results.failed > 0;
    const success = results.succeeded > 0 && results.failed === 0;

    let title;
    if (totalFailure) {
        title = '❌ CSV üleslaadimine ebaõnnestus';
    } else if (success) {
        title = '✅ CSV üleslaadimine õnnestus';
    } else {
        title = '⚠️ CSV üleslaadimine õnnestus osaliselt';
    }

    return (
        <Dialog
            open={open}
            title={title}
            onClose={onClose}
        >
            {totalFailure ? (
                <IssueAlert
                    type="danger"
                    heading="Viga laadimisel!"
                    message={results.error}
                />
            ) : (
                <div className={issueStyle.issues}>

                    <div>
                        <p><strong>Töödeldud:</strong> {results.processed}</p>
                        <p><strong>Edukas:</strong> {results.succeeded}</p>
                        {partialFailure && (
                            <p><strong>Ebaõnnestus:</strong> {results.failed}</p>
                        )}
                    </div>

                    {success && (
                        <IssueAlert
                            type="success"
                            heading="Kõik ained edukalt töödeldud!"
                        />
                    )}

                    {partialFailure && (
                        <>
                            <div className={issueStyle.issues}>
                                {results.courses
                                    .filter(c => c.status === 'failed')
                                    .sort((a, b) => Number(a.row) - Number(b.row))
                                    .map((course, index) => (
                                        <IssueAlert
                                            key={index}
                                            type="warning"
                                            heading={`Rida ${course.row}:`}
                                            message={course.error}
                                        />
                                    ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </Dialog>
    );
}

export default UploadDialog;