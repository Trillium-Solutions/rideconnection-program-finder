import { h, Component } from "preact";
import styles from "./style.css";

const Tooltip = props => {
    let { message } = props;
    return (
        <div class={styles.tooltip}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 120 120" style="enable-background:new 0 0 120 120;"><path d="M60,10c-27.7,0-50,22.3-50,50s22.3,50,50,50s50-22.3,50-50S87.7,10,60,10z M60,35.2c3.5,0,6.2,2.7,6.2,6.2s-2.7,6.2-6.2,6.2  s-6.2-2.7-6.2-6.2S56.5,35.2,60,35.2z M70.4,79c0,1-0.8,1.9-2.1,1.9H51.7c-1,0-2.1-0.6-2.1-1.9v-4.2c0-1,0.8-2.3,2.1-2.3  c1,0,2.1-0.6,2.1-1.9v-8.3c0-1-0.8-2.3-2.1-2.3c-1,0-2.1-0.6-2.1-1.9V54c0-1,0.8-2.3,2.1-2.3h12.5c1,0,2.1,1,2.1,2.3v16.7  c0,1,0.8,1.9,2.1,1.9c1,0,2.1,1,2.1,2.3V79z"></path></svg>
            <div class={styles.tooltipText}>{message}</div>
        </div>
    );
}

export default Tooltip;