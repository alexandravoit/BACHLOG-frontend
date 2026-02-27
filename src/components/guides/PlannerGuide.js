import { Text, Link } from '@primer/react';
import styles from './Guide.module.css';
import IssueAlert from "../issue/IssueAlert";

export default function PlannerGuide() {
    return (
        <div className={styles.guide}>
            <Text as="p">
                Semestrite vaates on võimalik planeerida Tartu Ülikooli õppeinfosüsteemi aineid 6 semestri vahel.
                Kursuseid saab lisada ühekaupa, sisestades vastav ainekood lahtrisse <code>Kursuse otsing</code> ning
                lohistades aine semestrisse 1-6.
            </Text>

            <IssueAlert
                type="info"
                heading="CSV faili üleslaadimine"
                message={
                    <>
                        Samuti on võimalus lisada mitu ainet korraga kasutades toimingut <em>Lae üles .csv failina</em>.
                        Faili koostamise juhendi leiad{' '}
                        <Link href="/guides/BACHLOG-csv-juhend.pdf" target="_blank" rel="noopener noreferrer">
                            <em>siit</em>
                        </Link>.
                    </>
                }
            />

            <div className={styles.section}>
                <Text as="h4" weight="semibold">Validatsioon</Text>
                <Text as="p">
                    <strong>Klikkides <code>Kontrolli</code> nuppu saab valideerida:</strong>
                </Text>
                <ul className={styles.list}>
                    <li>Kas ained on planeeritud õigesse semestrisse (sügis/kevad).</li>
                    <li>Kas kursuse eeldusained on planeeritud eelnevatesse semestritesse.</li>
                </ul>
            </div>

            <div className={styles.section}>
                <Text as="h4" weight="semibold">Üksikasjad</Text>
                <Text as="p">
                    <strong>Klikkides planeeritud aine peale on võimalik:</strong>
                </Text>
                <ul className={styles.list}>
                    <li>Näha kursuse üksikasju</li>
                    <li>Näha kursusega seotud probleeme</li>
                    <li>Täpsustada õppekava, mille raames ainet läbid</li>
                    <li>Täpsustada moodulit, mille raames ainet läbid</li>
                </ul>
            </div>

            <div className={styles.section}>
                <Text as="h4" weight="semibold">Eksport</Text>
                <Text as="p">
                    Plaani on võimalik salvestada kasutades toimingut <code>Lae alla .csv failina</code>.
                    Nii saad seda hiljem muuta ilma, et peaksid kõiki aineid uuesti käsitsi lisama!
                </Text>
            </div>
        </div>
    );
}