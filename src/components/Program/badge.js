import { h, Component } from "preact";

import styles from './style.css';

const Badge = props => {
    let { programData } = props;
    return(
        <div class={styles.badgeRow}>
            { renderBadges(programData) }
        </div>
    );
}

const categories = {
    'medical' : {
        badgeText: 'Medical Only',
        color: '#005EB8',
        tooltipText: 'Get a ride to a doctor\'s appointment'
    },
    'lunch' : {
        badgeText: 'Lunch Social Service',
        color: '#ED8B00',
        tooltipText: 'Get a meal and/or take class at a local senior center'
    },
    'other' : {
        badgeText: 'General Door-to-Door',
        color: '#0a5f31',
        tooltipText: 'Door to door service will take you almost anywhere you want to go within a designated service area'
    },
    'shopping' : {
        badgeText: 'Shopping',
        color: '#009639',
        tooltipText: 'Get a ride to a grocery store or shopping center.'
    },
    'route deviation' : {
        badgeText: 'Route Deviation',
        color: '#1d76db',
        tooltipText: 'Call in advance to schedule a pick-up or drop-off outside the regular route'
    }
}

function renderBadges(programData) {
    const { category } = programData;
    if (Array.isArray(category)) {
        return category.map(cat => getCategoryBadge(categories[cat]));
    }
    if (categories[category]) {
        return getCategoryBadge(categories[category]);
    }
    return '';
}

function getCategoryBadge(category) {
    let {badgeText, color, tooltipText} = category;
    return (
        <span class={styles.badge} style={{'background-color':color}}>
            { badgeText }
            <span class={styles.tooltipText}>{ tooltipText }</span>
        </span>
    );
}

export default Badge;