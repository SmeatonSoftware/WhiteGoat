import {Component} from "react";
import CenteredDiv from "../components/centeredDiv";
import BrowseItem from "../components/browseItem";
import GoatBar from "../components/goatBar";

export default class Browse extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <CenteredDiv height={98} sizerHeight={"vh"} width={98} sizerWidth={"vw"}>
            <div className="card border-primary mb-3" style={{width:"100%", minHeight: "20%"}}>
                <GoatBar title={"Browse White Goat Games"} pageChange={this.props.pageChange}/>
                <div className="card-body">
                    <div className="form-group">
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Game Title or Keywords"/>
                        <small id="emailHelp" className="form-text text-muted">If You Know The Game You Are Looking For
                            Or Some Key Words</small>
                    </div>
                </div>
            </div>

            <div style={{overflow: "scroll", maxHeight: "78%"}}>
                <BrowseItem/>
                <BrowseItem/>
                <BrowseItem/>
            </div>
        </CenteredDiv>;
    }
}
