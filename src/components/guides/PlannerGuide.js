import { Text, Link } from '@primer/react';
import styles from './Guide.module.css';
import IssueAlert from "../issue/IssueAlert";

export default function PlannerGuide() {
    return (
        <div className={styles.guide}>
            <Text as="p">
                Semestrite vaates on võimalik planeerida Tartu Ülikooli õppeinfosüsteemi aineid 6 semestri vahel.
                Kursuseid saab lisada ühekaupa, sisestades vastav ainekood lahtrisse <strong>Kursuse otsing</strong> ning
                lohistades aine semestrisse 1-6.
            </Text>

            <IssueAlert
                type="info"
                heading="CSV faili üleslaadimine"
                message={
                    <>
                        Samuti on võimalus lisada mitu ainet korraga kasutades toimingut <strong>Lae üles .csv failina</strong>.
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
                    Klikkides <strong>Kontrolli</strong> nuppu saab valideerida:
                </Text>
                <ol className={styles.list}>
                    <li>Kas ained on planeeritud õigesse semestrisse (sügis/kevad).</li>
                    <li>Kas kursuse eeldusained on planeeritud eelnevatesse semestritesse.</li>
                </ol>
            </div>

            <div className={styles.section}>
                <Text as="h4" weight="semibold">Üksikasjad</Text>
                <Text as="p">
                    Klikkides planeeritud aine peale on võimalik:
                </Text>
                <ol className={styles.list}>
                    <li>Näha kursuse üksikasju</li>
                    <li>Näha kursusega seotud probleeme</li>
                    <li>Täpsustada õppekava, mille raames ainet läbid</li>
                    <li>Täpsustada moodulit, mille raames ainet läbid</li>
                </ol>
            </div>

            <div className={styles.section}>
                <Text as="h4" weight="semibold">Eksport</Text>
                <Text as="p">
                    Plaani on võimalik salvestada kasutades toimingut <strong>Lae alla .csv failina</strong>.
                    Nii saad seda hiljem muuta ilma, et peaksid kõiki aineid uuesti käsitsi lisama!
                </Text>
            </div>
        </div>
    );
}