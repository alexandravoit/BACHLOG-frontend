import { Text, Link } from '@primer/react';
import IssueAlert from '../../components/issue/IssueAlert';
import styles from './Guide.module.css';

export default function ModulesGuide() {
    return (
        <div className={styles.guide}>
            <Text as="p">
                <strong>Moodulite vaates on võimalik planeerida eelnevalt lisatud aineid 6 mooduli vahel:</strong>
            </Text>

            <ol className={styles.list}>
                <li><strong>Põhimoodul</strong> (PM): Koosneb sinu eriala kohustuslikest ainetest</li>
                <li><strong>Valikmoodul</strong> (VM): Koosneb sinu eriala valikainetest</li>
                <li><strong>Lõputöö moodul</strong> (LM): Koosneb sinu eriala lõputööga seotud ainetest</li>
                <li><strong>Suunamoodul</strong> (SM)</li>
                <li><strong>Erialamoodul</strong> (EM)</li>
                <li><strong>Vabaainete moodul</strong> (VA)</li>
            </ol>

            <div className={styles.section}>
                <Text as="h4" weight="semibold">Validatsioon</Text>
                <Text as="p">
                    <strong>Klikkides <code>Kontrolli</code> nuppu saab valideerida:</strong>
                </Text>
                <ul className={styles.list}>
                    <li>Kas kohustuslikud ained põhi- ja lõputöömoodulitest on plaani lisatud</li>
                    <li>Kas mõni põhi-, lõputöö- või valikmooduli aine on määratud valesse moodulisse</li>
                    <li>Kas mõni aine on lisatud topelt</li>
                </ul>
            </div>

            <div className={styles.section}>
                <Text as="h4" weight="semibold">Moodulite täituvus</Text>
                <Text as="p">
                    <strong>Iga mooduli puhul on võimalik näha:</strong>
                </Text>
                <ul className={styles.list}>
                    <li>Planeeritud EAP arv</li>
                    <li>EAP jagunemine erialade kaupa</li>
                </ul>
            </div>

            <IssueAlert
                type="warning"
                heading="Tähelepanu!"
                message={
                    <>
                        Mõnede moodulite puhul ennustab BACHLOG ka minimaalset nõutud EAP hulka, kuid see ei pruugi alati täpne olla.
                        Seetõttu on oluline plaan iseseisvalt üle kontrollida ning küsimuste korral külastada{' '}
                        <Link
                            href="https://ois2.ut.ee/#/curricula"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                color: 'inherit',
                                fontStyle: 'italic',
                            }}
                        >
                            ÕISi
                        </Link>
                        {' '}või suhelda programmi koordinaatoriga!
                    </>
                }
            >
            </IssueAlert>
        </div>
    );
}