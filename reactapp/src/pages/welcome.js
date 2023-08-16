import {Component} from "react";
import logo from "../assets/logo.png";
import CenteredDiv from "../components/centeredDiv";
import GoatBar from "../components/goatBar";

export default class Welcome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <CenteredDiv height={98} sizerHeight={"vh"} width={98} sizerWidth={"vw"}>
            <div className="card border-primary mb-3" style={{width: "100%"}}>
                <GoatBar title={"White Goat Games"} page={0} pageChange={this.props.pageChange}/>
                <div className="card-body">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <hr/>
                    <h3 className="card-title">Your #1 Stop For Printable Board Games</h3>
                    <p className="card-text">
                        We Welcome You To Peruse Our Selection & Find Out More About Us!
                    </p>
                    <hr/>
                    <button type="button" className="btn btn-outline-success"
                            style={{minWidth: "10vw", marginRight: "1vw"}}
                            onClick={() => this.props.pageChange(1)}>Browse Games
                    </button>
                    <button type="button" className="btn btn-outline-info" style={{minWidth: "10vw"}}
                            onClick={() => this.props.pageChange(2)}>About Us
                    </button>
                    <hr/>
                </div>
            </div>
        </CenteredDiv>;
    }
}
