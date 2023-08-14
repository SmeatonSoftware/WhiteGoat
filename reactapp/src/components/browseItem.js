import {Component} from "react";

export default class BrowseItem extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="card border-primary mb-3" style={{maxWidth: "50rem"}}>
            <h3 className="card-header">Treacherous Waters</h3>
            <div className="card-body">
                <table>
                    <tbody>
                    <tr>
                        <td style={{width: "30%"}}>
                            <img
                                src={"https://i.dailymail.co.uk/i/pix/2013/08/25/article-2399835-1B6C2E8F000005DC-263_964x721.jpg"}
                                style={{width: "100%"}}/>
                        </td>
                        <td style={{verticalAlign: "top"}}>
                            <h5>Its like if cluedo and battleships had a baby, but good!</h5>
                            <hr/>
                            <p>
                                Version 2 is almost ready for testing. Its for 3 - 6 players. When it releases, there
                                will be pdfs to print out so you can play it wherever you are.
                            </p>
                            <button type="button" className="btn btn-outline-info"
                                    style={{minWidth: "10vw", marginRight: "1vw"}}>Download
                            </button>
                            <button type="button" className="btn btn-outline-success" style={{minWidth: "10vw"}}>Buy
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>;
    }
}
