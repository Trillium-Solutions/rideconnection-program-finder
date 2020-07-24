import { h, Component } from "preact";

import Program from "../Program";
import { selectAlternativePrograms } from "../../utils";

class AlternativeProgramList extends Component {

    render() {
        let { formData, programs } = this.props;
        if (Object.keys(formData).length === 0) {
            return '';
        }
        let alternativePrograms = selectAlternativePrograms(programs);
        if ( alternativePrograms.length === 0 ) {
            return '';
        }
        return (
            <div class="alt-program-list">
                <h2>Other transportation options</h2>
                <div class="section-headlines">
                    <p>Ride Connection also sponsors the following transportation programs to help you get around.</p>
                </div>
                {alternativePrograms.map(program => {
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

export default AlternativeProgramList;