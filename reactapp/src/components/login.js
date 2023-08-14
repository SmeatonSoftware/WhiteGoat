import {Component} from "react";
import CenteredDiv from "./centeredDiv";

export default class Login extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return <CenteredDiv height={70} sizerHeight={"vh"} width={50} sizerWidth={"vw"}>
            <div className="card border-primary mb-3" style={{maxWidth: "50rem"}}>
                <h1 className="card-header">Login To White Goat Games
                    <button type="button" className="btn btn-outline-info btn-sm" style={{float: "right"}}
                            onClick={() => this.props.pageChange(0)}>Back</button>
                </h1>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="form-label mt-4">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className="form-label mt-4">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" autoComplete="off"/>
                    </div>
                    <hr/>
                    <button type="button" className="btn btn-outline-success"
                            style={{minWidth: "10vw", marginRight: "1vw"}}>Login</button>
                    <button type="button" className="btn btn-outline-info"
                            style={{minWidth: "10vw"}}>Signup</button>
                </div>
            </div>
        </CenteredDiv>;
    }
}
