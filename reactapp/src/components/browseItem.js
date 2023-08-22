import {Component} from "react";
import ImagePanel from "./ImagePanel";
import BetterComponent from "../shared/betterComponent";
import APIRequest from "../shared/request";
import {HandThumbsDown, HandThumbsDownFill, HandThumbsUp, HandThumbsUpFill, Wrench} from "react-bootstrap-icons";

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

    render() {
        return <div className="card border-primary mb-3" style={{width: "100%"}} key={this.state.id}>
            <h3 className="card-header">
                {this.state.data.title}
            </h3>
            <div className="card-body">
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-sm-5"}>
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
                            <button type="button" className="btn btn-outline-success"
                                    style={{float:"left", marginRight: "1%"}}
                                    onClick={()=>this.vote(true)}><HandThumbsUp/>{this.state.pos}
                            </button>
                            <button type="button" className="btn btn-outline-danger"
                                    style={{float:"right", marginLeft: "1%"}}
                                    onClick={()=>this.vote(false)}>{this.state.neg}<HandThumbsDown/>
                            </button>
                            <div className="progress" style={{height: "100%"}}>
                                <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{width: this.state.voteRatio+"%"}}></div>
                                <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style={{width: 100-this.state.voteRatio+"%"}}></div>
                            </div>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col-sm"}>
                            {
                                this.state.data.state >= 4 ?
                                    <button type="button" className="btn btn-outline-success"
                                            style={{width:"100%"}}>Buy
                                    </button>
                                    :null
                            }
                        </div>
                        {
                            this.isAdmin() ?
                            <div className={"col-sm-2"}>
                                        <button type="button" className="btn btn-outline-warning"
                                                style={{width: "100%"}}
                                                onClick={()=>this.editItem(this.state.data.id)}
                                        ><Wrench/>
                                        </button>
                            </div>:null
                        }
                        <div className={"col-sm"}>
                            {
                                this.state.data.state >= 3 ?
                                    <button type="button" className="btn btn-outline-info"
                                            style={{width:"100%"}}>Download
                                    </button>
                                    :null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}
