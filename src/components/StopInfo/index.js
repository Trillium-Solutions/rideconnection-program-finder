import { h, Fragment } from "preact";
import styles from './style.css';

const StopInfo = props => {
    let { nearbyStops, stopsLoaded, formData } = props;
    if (!stopsLoaded) {
        return '';
    }
    let stopText;
    if ( nearbyStops === 1) {
        stopText = (<Fragment>There is <strong>1 bus stop</strong></Fragment>);
    }  else if (nearbyStops > 1) {
        stopText = (<Fragment>There are <strong>{nearbyStops.toString()} bus stops</strong></Fragment>)
    } else {
        stopText = 'No bus stops found';
    }
    let trimetURL = `https://trimet.org/ride/stops_near.html?has_geocode=false&geo_type=place&placeCoord=${formData.origin.lat}%2C${formData.origin.lng}&place=${formData.origin.name}`;
    return (
        <div class={styles.stopInfoContainer}>
            <p>{stopText} within 0.25 miles of your starting address. <a target={"_blank"} rel="noopener noreferrer" href={trimetURL}>Get directions to the nearest bus stops on the TriMet website.</a></p>
            <p>If you are unsure of how to take transit, you may be eligible for the <a href="https://rideconnection.org/services/travel-training">RideWise Travel Training Program</a>.</p>
            <p>Call 503-226-0700 or TTY: 7-1-1 (Oregon Relay Service) to learn more about travel training or other services</p>
            <p>Try these services first!<br />
            <a target={"_blank"} rel="noopener noreferrer" href="https://rideconnection.org/services/additional-programs">Ride Together Mileage Reimbursement</a><br />
            <a target={"_blank"} rel="noopener noreferrer" href="https://rideconnection.org/services/additional-programs">Veterans Helping Veterans</a>
            <br /><hr />
            <a target={"_blank"} rel="noopener noreferrer" href="https://trimet.org/lowincome/index.htm">TriMet's Reduced Fare Program</a>
            </p>
        </div>
    );
}

export default StopInfo;