import { h, Component } from "preact";

import Program from "../Program";

class ProgramList extends Component {

    render() {
        let { formData, eligiblePrograms } = this.props;
        if (Object.keys(formData).length === 0) {
            return '';
        }
        if ( eligiblePrograms.length === 0 ) {
            return(
                <div class="program-list no-programs">
                    <h2 class="section-header"><span>It looks like none of our programs fit your search.</span></h2>
                    <p class="subtitle">Check out these other transportation options and see if any fit your needs, or try searching with different criteria.</p>
                </div>
            );
        }
        return (
            <div class="program-list">
                <h2 class="section-header"><span>After registering with Ride Connection, you can access:</span></h2>
                {eligiblePrograms.map(program => {
                    return (
                        <Program
                            programData={program}
                            key={program.route_long_name}
                        />
                    );
                })}
            </div>
        );
    }
}

export default ProgramList;