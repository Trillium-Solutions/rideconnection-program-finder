import { h, Component } from "preact";

import styles from './style.css';
// Google autocomplete adds a lot of gross junk and is hard to make into
// a controlled component. Data flow gets funky.
class Autocomplete extends Component {
    constructor() {
        super();
        this.autocomplete = null;

        this.handleAutocompleteSelect = this.handleAutocompleteSelect.bind(this);
    }

    handleAutocompleteSelect() {
        const place = this.autocomplete.getPlace();
        console.log(place);
    }

    componentDidMount() {
        const { bottom_left, top_right } = this.props.programBounds;
        const defaultBounds = new window.google.maps.LatLngBounds(
            new window.google.maps.LatLng(bottom_left.lat, bottom_left.lng),
            new window.google.maps.LatLng(top_right.lat, top_right.lng)
        );
        const options = {
            bounds: defaultBounds,
            componentRestrictions: {
                country: 'us'
            },
            strictBounds: true
        };
        const originInput = document.getElementById('autocomplete');
        this.autocomplete = new window.google.maps.places.Autocomplete(originInput, options);
        this.autocomplete.addListener("place_changed", this.handleAutocompleteSelect);
    }

    render() {
        return (
            <div>
                <label for="autocomplete" class={styles.screenReaderText}>Starting location</label>
                <input
                    id="autocomplete"
                    name="origin"
                    type="text"
                    placeholder="Enter your starting location..."
                />
            </div>
        );
    }
}

export default Autocomplete;