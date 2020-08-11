import { h, Component } from "preact";

import styles from './style.css';

const Program = props => {
    let { programData } = props;
    let { description } = programData;
    return(
        <div class={styles.program}>
            <div class={styles.col}>
                { renderProgramTitle(programData) }
                { renderCallButton(programData) }
            </div>
            <div class={styles.col}>
                { renderBadges(programData) }
                { description }
            </div>
        </div>
    );
}

function renderProgramTitle(programData) {
    const { route_long_name, route_url } = programData;
    if (route_url) {
        return (
            <h3><a target="_blank" href={route_url}>{route_long_name}</a></h3>
        );
    }
    return (
        <h3>{route_long_name}</h3>
    );
}

function renderCallButton(programData) {
    const { phone_number } = programData;
    if (phone_number) {
        let phoneLink = `tel:1-${phone_number}`;
        return (
            <a class="btn btn-link" href={phoneLink}>{phone_number}</a>
        );
    }
    return '';
}

function renderBadges(programData) {
    const { category } = programData;
    if (category === 'medical') {
        return getCategoryBadge('Medical Only', '#005EB8');
    }
    if (category === 'lunch') {
        return getCategoryBadge('Lunch Social Service', '#ED8B00');
    }
    if (category === 'other') {
        return getCategoryBadge('General Door-to-Door', '#0a5f31')
    }
    if (category === 'shopping') {
        return getCategoryBadge('Shopping', '#009639')
    }
    return '';
}

function getCategoryBadge(text, color) {
    return (
        <div class={styles.badgeRow}><span class={styles.badge} style={{'background-color':color}}>{ text }</span></div>
    );
}

export default Program;