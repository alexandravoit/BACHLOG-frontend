import {Blankslate} from '@primer/react/experimental'
import {DatabaseIcon} from '@primer/octicons-react'
import styles from './LandingPage.module.css'

function LandingPage() {

    return (
      <div className={styles.landingPage}>
        <Blankslate border narrow>
          <Blankslate.Visual>
            <DatabaseIcon size="medium" />
          </Blankslate.Visual>
          <Blankslate.Heading>BACHLOG -v 2.0.0</Blankslate.Heading>
          <Blankslate.Description>Su baka backlog.</Blankslate.Description>
          <Blankslate.PrimaryAction as="a" href="/planner">
            Mine planeerima
          </Blankslate.PrimaryAction>
        </Blankslate>
      </div>
    );
}
export default LandingPage;