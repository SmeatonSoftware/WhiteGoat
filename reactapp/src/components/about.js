import {Component} from "react";
import CenteredDiv from "./centeredDiv";
import GoatBar from "./goatBar";

export default class About extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <CenteredDiv height={70} sizerHeight={"vh"} width={50} sizerWidth={"vw"}>
            <div className="card border-primary mb-3" style={{maxWidth: "50rem"}}>
                <GoatBar title={"About White Goat Games"} pageChange={this.props.pageChange}/>
                <div className="card-body">

                </div>
            </div>
        </CenteredDiv>;
    }
}
