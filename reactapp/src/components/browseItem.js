import {Component} from "react";
import ImagePanel from "./ImagePanel";
import BetterComponent from "../shared/betterComponent";

export default class BrowseItem extends BetterComponent {
    constructor(props) {
        super(props);

        this.state = {data: this.props.data}
    }

    editItem(id){
        this.props.pageChange(11,this.state.data);
    }

    getButtons(){
        var _buttons = <div></div>

        var state = this.state.data.state;

        switch (state){
            default:
                _buttons = <div>
                    <button type="button" className="btn btn-outline-success"
                            style={{minWidth: "10vw", width:"40%"}}>Vote For
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
