import {Component} from "react";

export default class GoatBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
                <div style={{position: "absolute", right: "1vw", top: "1vh"}}>
                    <button type="button" className="btn btn-outline-success btn-sm" style={{marginRight: "1vw"}}
                            onClick={() => this.props.pageChange(3)}>Login / Signup
                    </button>
                    <button type="button" className="btn btn-outline-info btn-sm"
                            onClick={() => this.props.pageChange(0)}>Back
                    </button>
                </div>
                <h1 className="card-header">{this.props.title}</h1>
            </div>

        );
    }
}
