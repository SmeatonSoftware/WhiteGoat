import {Component} from "react";
import logo from "../assets/logo.png";
import CenteredDiv from "./centeredDiv";

export default class Welcome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <CenteredDiv height={70} sizerHeight={"vh"} width={50} sizerWidth={"vw"}>
            <div className="card border-primary mb-3" style={{maxWidth: "50rem"}}>
                <h1 className="card-header">White Goat Games</h1>
                <div className="card-body">
                    <img src={logo} className="App-logo" alt="logo" />
                    <hr/>
                    <h3 className="card-title">Your #1 Stop For Printable Board Games</h3>
                    <p className="card-text">
                        We Welcome You To Peruse Our Selection & Find Out More About Us!
                    </p>
                    <hr/>
                    <button type="button" className="btn btn-outline-success" style={{minWidth:"10vw", marginRight:"1vw"}}>Browse Games</button>
                    <button type="button" className="btn btn-outline-info" style={{minWidth:"10vw"}}>About Us</button>
                    <hr/>
                </div>
            </div>
        </CenteredDiv>;
    }
}
