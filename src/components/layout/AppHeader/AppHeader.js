import { IconButton, Text } from '@primer/react';
import { ThreeBarsIcon } from '@primer/octicons-react';
import styles from './AppHeader.module.css'
import { ReactComponent as BachlogLogo } from '../../../assets/BACHLOG-LOGO.svg';

function AppHeader( {mainPage = '/', subPage = '' }) {
    return (
      <div className={styles.appHeader}>
        <IconButton icon={ThreeBarsIcon} size="small" aria-label="Menüü" />
        <BachlogLogo className={styles.logo} />
        <Text weight='semibold'>BACHLOG</Text>
        <Text weight='semibold'>/</Text>
        <Text weight='semibold'>{subPage}</Text>
      </div>
    );
}
export default AppHeader;