import {Component} from "react";
import ImagePanel from "./ImagePanel";
import BetterComponent from "../shared/betterComponent";

export default class BrowseItem extends BetterComponent {
    constructor(props) {
        super(props);

        this.state = {data: this.props.data}
        console.log(this.state);
    }

    editItem(id){
        this.props.pageChange(11,this.state.data);
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
                            {
                                this.isAdmin() ? <div>
                                    <hr/>
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
                            <button type="button" className="btn btn-outline-success"
                                    style={{minWidth: "10vw", width:"40%", marginRight: "1vw"}}>Buy
                            </button>
                            <button type="button" className="btn btn-outline-info"
                                    style={{minWidth: "10vw", width:"40%"}}>Download
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>;
    }
}
