import { h, Component } from "preact";
import Checkbox from "./Checkbox";

import styles from "./style.css";

const EligibilityBasedOptions = props => {
    const { isOpen, onToggle, fields  } = props;
    if (!isOpen) return <div style={{"max-height": "0"}} class={styles.optionsSection} />;
    return (
        <div style={{"max-height": "600px"}} class={styles.optionsSection}>
            <fieldset>
                <legend>Select all that apply</legend>
                <Checkbox
                    name="medical"
                    checked={fields.medical}
                    onToggle={onToggle}
                    label="This trip is for a medical appointment"
                />
                <Checkbox
                    name="shopping"
                    checked={fields.shopping}
                    onToggle={onToggle}
                    label="This trip is to help me go shopping"
                />
                <Checkbox
                    name="social"
                    checked={fields.social}
                    onToggle={onToggle}
                    label="I am looking for trips that provide a social experience"
                />
            </fieldset>
        </div>
    );
}

export default EligibilityBasedOptions;