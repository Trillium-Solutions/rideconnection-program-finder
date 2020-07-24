import { h, Component } from "preact";

import styles from './style.css';

const Program = props => {
    let { route_long_name, route_url, phone_number, description } = props.programData;
    let phoneLink = `tel:1-${phone_number}`;
    return(
        <div class={styles.program}>
            <div class={styles.col}>
                <h3><a href={route_url}>{route_long_name}</a></h3>
                <a class="btn btn-link" href={phoneLink}>{phone_number}</a>
            </div>
            <div class={styles.col}>
                {description}
            </div>
        </div>
    );
}

export default Program;