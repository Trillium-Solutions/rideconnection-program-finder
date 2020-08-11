import { h, Component } from "preact";

import Autocomplete from "./Autocomplete";

import styles from "./style.css";

class Form extends Component {
    constructor() {
        super();
        this.state = {
            eligibility_restricted: true,
            origin: {
                lat: null,
                lng: null
            }
        };
    }

    onSubmit(e) {
        e.preventDefault();
        // TODO handle form validation before submitting
        this.props.handleFormSubmit(this.state);
    }

    handleAutocompleteInput(coords) {
        this.setState({origin: coords});
    }

    onToggle(e) {
        const { name } = e.target;
        let checked = !this.state[name];
        this.setState({ [name]: checked});
    }

    render() {
        return (
            <form onSubmit={(e) => this.onSubmit(e)}>
                <fieldset class={styles.formLegend}>
                    <legend>Are you 60+ years old or experiencing a disability?</legend>
                    <input
                        type="radio"
                        id="yes_eligible"
                        name="eligibility_restricted"
                        onClick={(e) => this.onToggle(e)}
                        checked={this.state.eligibility_restricted}
                    />
                    <label for="yes_eligible">Yes</label>
                    <input
                        type="radio"
                        id="no_eligible"
                        name="eligibility_restricted"
                        onClick={(e) => this.onToggle(e)}
                        checked={!this.state.eligibility_restricted}
                    />
                    <label for="no_eligible">No</label>
                </fieldset>
                <div class={styles.autoCompleteSection}>
                    <div>
                        <Autocomplete
                            programBounds={this.props.programBounds}
                            handleInput={(coords) => this.handleAutocompleteInput(coords)}
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Get programs"
                        />
                    </div>
                </div>
            </form>
        );
    }
}

export default Form;