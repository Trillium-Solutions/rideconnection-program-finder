import { h, Component } from "preact";

import styles from './style.css';
// Google autocomplete is hard to make into
// a controlled component.
class Autocomplete extends Component {
    constructor() {
        super();
        this.autocomplete = null;

        this.handleAutocompleteSelect = this.handleAutocompleteSelect.bind(this);
    }

    handleAutocompleteSelect() {
        const place = this.autocomplete.getPlace();
        console.log(place);
        let lat = place.geometry.location.lat();
        let lng = place.geometry.location.lng();
        let name = place.name;
        this.props.handleInput({lat, lng, name});
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
                    placeholder="Enter your specific starting location (920 SW 3rd, Powell Park, etc.)"
                />
            </div>
        );
    }
}

export default Autocomplete;