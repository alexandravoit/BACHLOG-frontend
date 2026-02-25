import {Hero, Card, ThemeProvider as BrandTheme} from '@primer/react-brand';
import { ReactComponent as BigLogo } from '../../assets/BACHLOG-OUTLINE-LOGO.svg'
import styles from './LandingPage.module.css'
import React from "react";

function LandingPage() {

    return (
        <BrandTheme colorMode="auto">
            <div className={styles.landingPage}>

                <div className={styles.hero}>
                    <Hero>
                        <Hero.Heading>BACHLOG:</Hero.Heading>
                        <Hero.Heading>Sinu baka <em>backlog</em></Hero.Heading>
                        <Hero.Description>
                            Bakalaureuse õppeplaani koostamiseks ja valideerimiseks mõeldud rakendus Tartu Ülikooli tudengitele.
                        </Hero.Description>
                    </Hero>

                    <BigLogo className={styles.logo} />

                </div>


                <div className={styles.cards}>
                    <div>
                        <Card ctaText="" href="/semesters" hasBorder fullWidth={true} >
                            <Card.Heading>Kursused</Card.Heading>
                            <Card.Description>
                                Otsi kursuseid. Saa infot nende kuuluvuse, eeldusainete ning toimumisaja kohta.
                            </Card.Description>
                        </Card>
                    </div>

                    <div>
                        <Card ctaText="" href="/semesters" hasBorder fullWidth={true} >
                            <Card.Heading>Semestrid</Card.Heading>
                            <Card.Description>
                                Planeeri kursuseid semestrite kaupa. Kontrolli plaani korrektsust.
                            </Card.Description>
                        </Card>
                    </div>

                    <div>
                        <Card ctaText="" href="/modules" hasBorder fullWidth={true} >
                            <Card.Heading>Moodulid</Card.Heading>
                            <Card.Description>
                                Jaga kursuseid moodulite vahel. Kontrolli moodulite ning õppekava täituvust.
                            </Card.Description>
                        </Card>
                    </div>
                </div>

            </div>
        </BrandTheme>

    );
}
export default LandingPage;