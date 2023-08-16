import {Component} from "react";
import CenteredDiv from "../components/centeredDiv";
import APIRequest from "../shared/request";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: "", error: ""}
    }

    async login() {
        var that = this;

        if (this.state.email.length == 0 || this.state.password.length == 0)
            return;

        var req = new APIRequest("auth/login?email=" + this.state.email + "&password=" + this.state.password
            , "", "POST");
        await req.executeWithCallback(
            (d) => {
                if (document.location.href.includes("localhost")){
                    localStorage.setItem("sid", d["sid"]);
                    localStorage.setItem("key", d["key"]);
                }
                this.props.pageChange(0);
            },
            (d) => {
                that.setState({error: d["detail"]});
            });
    }

    async signup() {
        var that = this;

        if (this.state.email.length == 0 || this.state.password.length == 0)
            return;

        var req = new APIRequest("auth/register?email=" + this.state.email + "&password=" + this.state.password
            , "", "POST");
        await req.executeWithCallback(
            (d) => {
                this.login();
            },
            (d) => {
                that.setState({error: d["detail"]});
            });
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
                        <label htmlFor="emailInput" className="form-label mt-4">Email address</label>
                        <input type="email" className="form-control" id="emailInput" placeholder="Enter email"
                               onChange={(e) => this.setState({email: e.target.value})} value={this.state.email}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                            else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwordInput" className="form-label mt-4">Password</label>
                        <input type="password" className="form-control" id="pwordInput" placeholder="Password"
                               autoComplete="off"
                               onChange={(e) => this.setState({password: e.target.value})} value={this.state.password}
                        />
                    </div>
                    <small id="emailHelp" className="form-text text-danger">{this.state.error}</small>
                    <hr/>
                    <button type="button" className="btn btn-outline-success"
                            style={{minWidth: "10vw", marginRight: "1vw"}} onClick={() => this.login()}>Login
                    </button>
                    <button type="button" className="btn btn-outline-info"
                            style={{minWidth: "10vw"}} onClick={() => this.signup()}>Signup
                    </button>
                </div>
            </div>
        </CenteredDiv>;
    }
}
