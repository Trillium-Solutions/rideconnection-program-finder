import { h, Component } from "preact";
import styles from './style.css'

const Checkbox = props => {
    const { name, onToggle, label, checked } = props;
    return (
        <div class={styles.formField}>
            <input
                type="checkbox"
                checked={checked}
                onClick={onToggle}
                name={name}
                id={name}
            />
            <label for={name}>
                {label}
            </label>
        </div>
    );
}

export default Checkbox;