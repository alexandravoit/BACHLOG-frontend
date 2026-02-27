import { IconButton, Text } from '@primer/react';
import { useState } from 'react';
import { ThreeBarsIcon } from '@primer/octicons-react';
import styles from './AppHeader.module.css'
import { ReactComponent as BachlogLogo } from '../../../assets/logos/LOGO-minimal.svg';
import DialogPane from "../SlidingPane/DialogPane";
import MainMenu from "../SlidingPane/Content/MainMenu/MainMenu";
import { useLocation } from 'react-router-dom';

function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const routeTitles = {
        '/': 'Avaleht',
        '/semesters': 'Semestrid',
        '/modules': 'Moodulid',
    };

    const currentTitle = routeTitles[location.pathname] || '';

    return (
        <div className={styles.appHeader}>
            <IconButton
                icon={ThreeBarsIcon}
                variant="ghost"
                size="small"
                aria-label="Menüü"
                onClick={() => setIsMenuOpen(true)}
            />
            <BachlogLogo className={styles.logo} />
            <Text weight='semibold'>BACHLOG</Text>
            <Text weight="semibold">/</Text>
            <Text weight="semibold">{currentTitle}</Text>

            <DialogPane isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                <MainMenu />
            </DialogPane>
        </div>
    );
}
export default AppHeader;