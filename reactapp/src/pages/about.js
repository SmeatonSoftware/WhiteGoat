import {Component} from "react";
import CenteredDiv from "../components/centeredDiv";
import GoatBar from "../components/goatBar";

export default class About extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <CenteredDiv height={98} sizerHeight={"vh"} width={98} sizerWidth={"vw"}>
            <div className="card border-primary mb-3" style={{width: "100%"}}>
                <GoatBar title={"About White Goat Games"} pageChange={this.props.pageChange}/>
                <div className="card-body">

                </div>
            </div>
        </CenteredDiv>;
    }
}
