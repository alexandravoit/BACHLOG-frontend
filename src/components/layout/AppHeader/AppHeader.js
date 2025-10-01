import { IconButton, Text } from '@primer/react';
import { useState } from 'react';
import { ThreeBarsIcon } from '@primer/octicons-react';
import styles from './AppHeader.module.css'
import { ReactComponent as BachlogLogo } from '../../../assets/BACHLOG-LOGO.svg';
import SlidingPane from "../SlidingPane/SlidingPane";
import MainMenu from "../SlidingPane/Content/MainMenu/MainMenu";

function AppHeader( {mainPage = '/', subPage = '' }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className={styles.appHeader}>
            <IconButton
                icon={ThreeBarsIcon}
                size="small"
                aria-label="Menüü"
                onClick={() => setIsMenuOpen(true)}
            />
            <BachlogLogo className={styles.logo} />
            <Text weight='semibold'>BACHLOG</Text>
            <Text weight='semibold'>/</Text>
            <Text weight='semibold'>{subPage}</Text>

            {isMenuOpen && (
            <SlidingPane isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
              <MainMenu />
            </SlidingPane>
            )}
        </div>
    );
}
export default AppHeader;