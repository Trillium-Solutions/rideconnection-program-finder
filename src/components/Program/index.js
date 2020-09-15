import { h, Component } from "preact";
import Badge from "./badge";
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
                <Badge programData={programData} />
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

export default Program;