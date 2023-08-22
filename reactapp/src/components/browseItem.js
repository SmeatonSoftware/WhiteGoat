import {Component} from "react";
import ImagePanel from "./ImagePanel";
import BetterComponent from "../shared/betterComponent";
import APIRequest from "../shared/request";

export default class BrowseItem extends BetterComponent {
    constructor(props) {
        super(props);

        this.state = {data: this.props.data, voteRatio: 0, pos: 0, neg: 0}
    }

    componentFirstMount() {
        this.getVotes();
    }

    editItem(){
        this.props.pageChange(11,this.state.data);
    }

    async vote(positive){
        var that = this;
        var req = new APIRequest("votes/votefor?gameId="+this.state.data.id+"&positive="+positive, "", "GET");
        await req.executeWithCallback(
            (d) => {
                that.getVotes();
            },
            (d) => {
            }, true);
    }

    async getVotes(){
        var that = this;
        var req = new APIRequest("votes/get?gameId="+this.state.data.id, "", "GET");
        await req.executeWithCallback(
            (d) => {
                var pos = d["positive"];
                var neg = d["negative"];
                this.setState({voteRatio: pos / (pos+neg) * 100, pos: pos, neg: neg})
            },
            (d) => {
            }, true);
    }

    getButtons(){
        var _buttons = <div></div>

        var state = this.state.data.state;

        switch (state){

            case 3:
                _buttons = <div>
                    <button type="button" className="btn btn-outline-info"
                            style={{minWidth: "fit-content", width:"40%"}}>Download
                    </button>
                </div>;
                break;

            case 4:
                _buttons = <div>
                    <button type="button" className="btn btn-outline-success"
                            style={{minWidth: "fit-content", width:"40%", marginRight: "5%"}}>Buy
                    </button>
                    <button type="button" className="btn btn-outline-info"
                            style={{minWidth: "fit-content", width:"40%"}}>Download
                    </button>
                </div>;
                break;
        }

        return _buttons;
    }

    render() {
        return <div className="card border-primary mb-3" style={{width: "100%"}} key={this.state.id}>
            <h3 className="card-header">
                {
                    this.isAdmin() ?
                        <button type="button" className="btn btn-outline-warning"
                                style={{float: "left"}}
                                onClick={()=>this.editItem(this.state.data.id)}
                        ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-wrench" viewBox="0 0 16 16">
                            <path d="M.102 2.223A3.004 3.004 0 0 0 3.78 5.897l6.341 6.252A3.003 3.003 0 0 0 13 16a3 3 0 1 0-.851-5.878L5.897 3.781A3.004 3.004 0 0 0 2.223.1l2.141 2.142L4 4l-1.757.364L.102 2.223zm13.37 9.019.528.026.287.445.445.287.026.529L15 13l-.242.471-.026.529-.445.287-.287.445-.529.026L13 15l-.471-.242-.529-.026-.287-.445-.445-.287-.026-.529L11 13l.242-.471.026-.529.445-.287.287-.445.529-.026L13 11l.471.242z"/>
                        </svg>
                        </button>:null
                }
                {this.state.data.title}
            </h3>
            <div className="card-body">
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-sm"}>
                            <ImagePanel images={this.state.data.imageURLs}/>
                        </div>
                        <div className={"col-sm"}>
                            <h5>{this.state.data.summary}</h5>
                            <hr/>
                            <p>
                                {this.state.data.description}
                            </p>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col-sm"}>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{width: this.state.voteRatio+"%"}}></div>
                                <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style={{width: 100-this.state.voteRatio+"%"}}></div>
                            </div>
                            <small id="emailHelp" className="form-text">{this.state.pos} : {this.state.neg}</small>
                            <div>
                                <button type="button" className="btn btn-outline-success"
                                        style={{minWidth: "10vw", width:"40%", marginRight:"5%"}}
                                        onClick={()=>this.vote(true)}>Thumb Up
                                </button>
                                <button type="button" className="btn btn-outline-danger"
                                        style={{minWidth: "10vw", width:"40%"}}
                                        onClick={()=>this.vote(false)}>Thumb Down
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col-sm"}>
                            { this.getButtons()}
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}
