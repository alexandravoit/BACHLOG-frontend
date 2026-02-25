import { AnchoredOverlay, Text } from '@primer/react'
import styles from '../LandingPage.module.css'
import { useState } from 'react'

function BacklogWithTooltip() {
    const [open, setOpen] = useState(false)

    return (
        <AnchoredOverlay
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            side="outside-right"
            anchorOffset={20}
            alignmentOffset={20}
            renderAnchor={(anchorProps) => (
                <Text
                    className={styles.tooltip}
                    {...anchorProps}
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                >
                    <em>backlog</em>
                </Text>
            )}
        >
            <div className={styles.tooltipExplanation}>
                <Text>
                    <strong>Backlog </strong>
                    ehk "kuhjunud eelseisvad tööd"
                </Text>
            </div>
        </AnchoredOverlay>
    )
}

export default BacklogWithTooltip
