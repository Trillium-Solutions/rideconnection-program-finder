import { h, Component } from "preact";
import axios from 'axios';
import PapaParse from 'papaparse';
import WKT from 'terraformer-wkt-parser';

import Form from './Form';
import ProgramList from './ProgramList';
import AlternativeProgramList from './AlternativeProgramList';

import { calculateProgramBounds, selectActivePrograms } from '../utils';

// props passed in from preact-habitat
class Widget extends Component {

    constructor() {
        super();
        this.state = {
            error: false,
            programs: {loaded: false, data: []},
            areas: {loaded: false, data: []},
            formData: {},
            eligiblePrograms: []
        };
        this.bounds = null;
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount() {
        this.loadPrograms();
        this.loadAreas();
    }

    loadPrograms() {
        axios.get(this.props.programsFile)
            .then(response => {
                this.setState({
                    programs: {
                        loaded: true,
                        data: response.data
                    }
                });
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

    loadAreas() {
        axios.get(this.props.areasFile, {
            responseType: 'text'
        })
        .then(response => {
            const areasJSON = PapaParse.parse(response.data, {
                header: true,
                delimiter: ",",
                skipEmptyLines: true
            });
            const areas = areasJSON.data.map(area => {
                return {
                    area_id: area.area_id,
                    geojson: WKT.parse(area.wkt)
                }
            });
            this.bounds = calculateProgramBounds(areas);
            this.setState({
                areas: {
                    loaded: true,
                    data: areas
                }
            });
        })
        .catch(error => {
            this.setState({error: true})
        });
    }

    handleFormSubmit(formData) {
        this.setState({ formData });
        let { programs, areas } = this.state;
        const eligiblePrograms = selectActivePrograms({
            formData: formData,
            programs: programs.data,
            areas:areas.data
        });
        this.setState({eligiblePrograms});
    }

    renderLoading() {
        return (
            <div id="pf-wrapper">
                <div class="spinner rpf-loading">Loading...</div>
            </div>
        );
    }

    renderProgramFinder() {
        return (
            <div id="pf-wrapper">
                <Form
                    handleFormSubmit={this.handleFormSubmit}
                    programBounds={this.bounds}
                />
                <ProgramList
                    programs={this.state.programs.data}
                    formData={this.state.formData}
                    eligiblePrograms={this.state.eligiblePrograms}
                />
                <AlternativeProgramList
                    programs={this.state.programs.data}
                    formData={this.state.formData}
                />
            </div>
        );
    }

    renderError() {
        return (
            <div id="pf-wrapper">
                <p class="error-msg">
                    Sorry! Looks like there was an error loading the programs.
                </p>
            </div>
        )
    }

    render() {
        if (this.state.areas.loaded && this.state.programs.loaded) {
            return this.renderProgramFinder();
        } else if (this.state.error) {
            return this.renderError();
        } else {
            return this.renderLoading();
        }
    }
}

Widget.defaultProps = {
    programsFile: 'assets/programs.json',
    areasFile: 'assets/areas.txt'
}

export default Widget;