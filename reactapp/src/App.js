import './App.css';
import Welcome from "./components/welcome";
import {Component} from "react";

export default class App extends Component{
    constructor(props) {
        super(props);

        this.state = {page: 0}
    }

    render() {
        return (
            <div className="App">
                {
                    this.state.page == 0 ? <Welcome/> : <Welcome/>
                }
            </div>
        );
    }
}
