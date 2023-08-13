import {Component} from "react";
import CenteredDiv from "./centeredDiv";

export default class About extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <CenteredDiv height={70} sizerHeight={"vh"} width={50} sizerWidth={"vw"}>
            <div className="card border-primary mb-3" style={{maxWidth: "50rem"}}>
                <h1 className="card-header">About White Goat Games
                    <button type="button" className="btn btn-outline-secondary btn-sm" style={{float: "right"}}
                            onClick={() => this.props.pageChange(0)}>Back</button>
                </h1>
                <div className="card-body">

                </div>
            </div>
        </CenteredDiv>;
    }
}
