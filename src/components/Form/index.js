import { h, Component } from "preact";

import Checkbox from "./Checkbox";
import Autocomplete from "./Autocomplete";

class Form extends Component {
    constructor() {
        super();
        this.state = {
            eligibility_restricted: false,
            medical: false,
            shopping: false,
            social: false,
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
        console.log(coords);
    }

    onToggle(e) {
        const { name } = e.target;
        let checked = !this.state[name];
        this.setState({ [name]: checked});
    }

    render() {
        return (
            <form onSubmit={(e) => this.onSubmit(e)}>
                <fieldset>
                    <legend>Select all that apply</legend>
                    <Checkbox
                        name="eligibility_restricted"
                        checked={this.state.eligibility_restricted}
                        onToggle={(e) => this.onToggle(e)}
                        label="I am 60+ years old or experiencing a disability"
                    />
                    <Checkbox
                        name="medical"
                        checked={this.state.medical}
                        onToggle={(e) => this.onToggle(e)}
                        label="This trip is for a medical appointment"
                    />
                    <Checkbox
                        name="shopping"
                        checked={this.state.shopping}
                        onToggle={(e) => this.onToggle(e)}
                        label="This trip is to help me go shopping"
                    />
                    <Checkbox
                        name="social"
                        checked={this.state.social}
                        onToggle={(e) => this.onToggle(e)}
                        label="I am looking for trips that provide a social experience"
                    />
                </fieldset>
                <div style={{
                    'display': 'flex',
                    'justify-content': 'space-between',
                    'align-items': 'center',
                    'margin-bottom': '24px'
                    }}>
                    <div style={{'flex': '1', 'margin-right': '24px'}}>
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