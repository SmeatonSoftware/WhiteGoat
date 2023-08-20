import {Component} from "react";
import APIRequest from "../shared/request";
import BetterComponent from "../shared/betterComponent";

export default class GoatBar extends BetterComponent {
    constructor(props) {
        super(props);
        this.state = {showLogin: true, userData: {}};
    }

    componentFirstMount() {
        var logged = localStorage.getItem("loggedIn");
        if (logged != null){
            this.setState({showLogin: logged != "true"});
        }
        else {
            this.checkAuth();
        }
    }

    async checkAuth(){
        var that = this;

        var req = new APIRequest("auth/check", "", "GET");
        await req.executeWithCallback(
            (d) => {
                localStorage.setItem("loggedIn", true);
                localStorage.setItem("user", JSON.stringify(d));
                that.setState({showLogin: false, userData: d});
            },
            (d) => {
                localStorage.setItem("loggedIn", false);
                that.setState({showLogin: true, userData: d});
            });
    }

    async logout(){
        var that = this;

        var req = new APIRequest("auth/logout", "", "GET");
        await req.executeWithCallback(
            (d) => {
                that.props.pageChange(0);
            },
            (d) => {
            }, false);

        localStorage.removeItem("user");
        localStorage.removeItem("loggedIn");
        that.setState({showLogin: true});
    }

    render() {
        return (<div>
                <h1 className="card-header">{this.props.title}</h1>
                <div style={{float:"right", margin: "1rem"}}>
                    <button hidden={this.state.showLogin} type="button" className="btn btn-outline-warning btn-sm"
                            onClick={() => this.logout()}>Logout
                    </button>
                    <button hidden={!this.state.showLogin} type="button" className="btn btn-outline-success btn-sm"
                            onClick={() => this.props.pageChange(3)}>Login
                    </button>
                    <button hidden={this.props.page == 0} type="button" className="btn btn-outline-info btn-sm" style={{marginLeft: "1vw"}}
                            onClick={() => this.props.pageChange(0)}>Back
                    </button>
                </div>
            </div>

        );
    }
}
