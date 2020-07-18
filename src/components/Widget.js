import { h, Component } from "preact";

export default class App extends Component {

    render() {
        return (
            <div id="pf-wrapper">
                <h1 style={{ color: this.props.color }}>Hello, World!</h1>
            </div>
        );
    }
}