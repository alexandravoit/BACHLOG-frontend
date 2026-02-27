import {Hero, Card, ThemeProvider as BrandTheme, BreakoutBanner, AnimationProvider, Animate} from '@primer/react-brand';
import { ReactComponent as LogoMainSquared } from '../../assets/logos/LOGO-main-squared.svg'
import { ReactComponent as LogoMain } from '../../assets/logos/LOGO-main.svg'
import styles from './LandingPage.module.css'
import React from "react";
import BacklogWithTooltip from "./components/BacklogWithTooltip";

function LandingPage() {

    return (
        <BrandTheme colorMode="auto">
            <AnimationProvider>

                <div className={styles.landingPage}>

                    <div className={styles.hero}>
                        <Animate animate="slide-in-right">
                            <Hero className={styles.heroText}>
                                <Hero.Heading>BACHLOG:</Hero.Heading>
                                <Hero.Heading>Sinu baka <BacklogWithTooltip/> </Hero.Heading>
                                <Hero.Description>
                                    Bakalaureuse õppeplaani koostamiseks ja valideerimiseks mõeldud rakendus Tartu Ülikooli tudengitele.
                                </Hero.Description>
                            </Hero>
                        </Animate>

                        <LogoMainSquared className={`${styles.logo} ${styles.logoDesktop}`} />
                        <LogoMain className={`${styles.logo} ${styles.logoMobile}`} />
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

                    <Animate animate="fade-in">
                        <BreakoutBanner
                            className={styles.banner}
                            backgroundColor="var(--bgColor-default)"
                            align="center"
                        >
                            <BreakoutBanner.Heading>Tudengilt tudengile!</BreakoutBanner.Heading>
                            <BreakoutBanner.Description>
                                Valminud Informaatika bakalaureusetöö raames.
                                Küsimuste, kaebuste või muude mõtete korral otsige üles <strong>Alexandra Voit</strong>.
                            </BreakoutBanner.Description>
                        </BreakoutBanner>
                    </Animate>

                </div>

            </AnimationProvider>
        </BrandTheme>
    );
}
export default LandingPage;