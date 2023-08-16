import {Component} from "react";
import APIRequest from "../shared/request";

export default class GoatBar extends Component {
    constructor(props) {
        super(props);
        this.state = {showLogin: false, userData: {}}
    }

    componentDidMount() {
        this.checkAuth();
    }

    async checkAuth(){
        var that = this;

        var headers =  document.location.href.includes("localhost") ?
            {"sid": localStorage.getItem("sid"), "key": localStorage.getItem("key")} : {};

        var req = new APIRequest("auth/check", "", "GET");
        await req.executeWithCallback(
            (d) => {
                that.setState({showLogin: false, userData: d});
            },
            (d) => {
            }, true, headers);
    }

    async logout(){

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
