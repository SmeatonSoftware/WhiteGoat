import {Component} from "react";
import ImagePanel from "./ImagePanel";

export default class BrowseItem extends Component {
    constructor(props) {
        super(props);

        this.state = {data: this.props.data}
        console.log(this.state);
    }

    render() {
        return <div className="card border-primary mb-3" style={{width: "100%"}} key={this.state.id}>
            <h3 className="card-header">{this.state.data.title}</h3>
            <div className="card-body">
                <table>
                    <tbody>
                    <tr>
                        <td style={{verticalAlign: "top"}}>
                            <ImagePanel images={this.state.data.imageURLs}/>
                            <h5>{this.state.data.summary}</h5>
                            <hr/>
                            <p>
                                {this.state.data.description}
                            </p>
                            <button type="button" className="btn btn-outline-success"
                                    style={{minWidth: "10vw", marginRight: "1vw"}}>Buy
                            </button>
                            <button type="button" className="btn btn-outline-info"
                                    style={{minWidth: "10vw"}}>Download
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>;
    }
}
