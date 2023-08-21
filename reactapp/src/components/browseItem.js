import {Component} from "react";
import ImagePanel from "./ImagePanel";
import BetterComponent from "../shared/betterComponent";
import APIRequest from "../shared/request";

export default class BrowseItem extends BetterComponent {
    constructor(props) {
        super(props);

        this.state = {data: this.props.data, voteRatio: 0}
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
                this.setState({voteRatio: pos / (pos+neg) * 100})
            },
            (d) => {
            }, true);
    }

    getButtons(){
        var _buttons = <div></div>

        var state = this.state.data.state;

        switch (state){
            default:
                _buttons = <div>
                    <button type="button" className="btn btn-outline-success"
                            style={{minWidth: "10vw", width:"40%", marginRight:"5%"}}
                            onClick={()=>this.vote(true)}>Thumb Up
                    </button>
                    <button type="button" className="btn btn-outline-danger"
                            style={{minWidth: "10vw", width:"40%"}}
                            onClick={()=>this.vote(false)}>Thumb Down
                    </button>
                </div>;
                break;

            case 3:
                _buttons = <div>
                    <button type="button" className="btn btn-outline-info"
                            style={{minWidth: "10vw", width:"40%"}}>Download
                    </button>
                </div>;
                break;

            case 4:
                _buttons = <div>
                    <button type="button" className="btn btn-outline-success"
                            style={{minWidth: "10vw", width:"40%", marginRight: "1vw"}}>Buy
                    </button>
                    <button type="button" className="btn btn-outline-info"
                            style={{minWidth: "10vw", width:"40%"}}>Download
                    </button>
                </div>;
                break;
        }

        return _buttons;
    }

    render() {
        return <div className="card border-primary mb-3" style={{width: "100%"}} key={this.state.id}>
            <h3 className="card-header">{this.state.data.title}</h3>
            <div className="card-body">
                <table style={{width:"100%"}}>
                    <tbody>
                    <tr>
                        <td style={{verticalAlign: "top", width: "30vw"}}>
                            <ImagePanel images={this.state.data.imageURLs}/>
                        </td>
                        <td>
                            <h5>{this.state.data.summary}</h5>
                            <hr/>
                            <p>
                                {this.state.data.description}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <hr/>
                            {
                                this.isAdmin() ? <div>
                                    <button type="button" className="btn btn-outline-warning"
                                            style={{minWidth: "10vw", width:"50%"}}
                                            onClick={()=>this.editItem(this.state.data.id)}
                                    >Manage
                                    </button>
                                </div>:<div></div>
                            }
                        </td>
                        <td>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: this.state.voteRatio+"%"}}></div>
                            </div>
                            <hr/>
                            { this.getButtons()}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>;
    }
}
