import BetterComponent from "../shared/betterComponent";
import CenteredDiv from "../components/centeredDiv";
import GoatBar from "../components/goatBar";
import "../styling/BrowseItemManage.scss";
import APIRequest from "../shared/request";

export default class BrowseItemManage extends BetterComponent{
    constructor(props) {
        super(props);

        var hasPropData = Object.keys(this.props.data).length != 0;

        var d = hasPropData ? this.props.data :
            {
                State: 0,
                Visible: false,
                GameType: 0,
                CreatorUserId: this.getUser()["id"]
            };

        this.state = {data: d, error: "", mode: hasPropData ? 1 : 0};
    }

    updateDataField(field, value){
        var d = this.state.data;
        d[field] = value;

        this.setState({data: d});
    }

    getDataField(field, _default){
        var d = this.state.data;

        var v = d[field];

        return v == null ? _default : v;
    }

    render() {
        return <CenteredDiv height={98} sizerHeight={"vh"} width={98} sizerWidth={"vw"} style={{overflow:"scroll"}}>
            <div className="card border-primary mb-3" style={{minWidth:"100%", minHeight: "100%"}}>
                <div className="card-body">
                    <GoatBar title={"Manage A Game"} pageChange={this.props.pageChange}/>
                    <table className={"table"}>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label className="form-label mt-4">Title</label>
                                        <input type="text" className="form-control" placeholder="Title"
                                               onChange={(e)=>this.updateDataField("title", e.target.value)}
                                               value={this.getDataField("title","")}
                                        />
                                        <small className="form-text text-muted">Catchy, brief and meaningful. This will be the first thing people hear about your game.</small>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <label className="form-label mt-4">Summary</label>
                                        <input type="text" className="form-control" placeholder="Summary"
                                               onChange={(e)=>this.updateDataField("summary", e.target.value)}
                                               value={this.getDataField("summary","")}
                                        />
                                        <small className="form-text text-muted">In a few words, how would you describe the game?</small>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label className="form-label mt-4">Tags</label>
                                        <input type="text" className="form-control" placeholder="Tags"
                                               onChange={(e)=>this.updateDataField("tags", e.target.value)}
                                               value={this.getDataField("tags","")}
                                        />
                                        <small className="form-text text-muted">Semicolon (;) seperated key words that describe aspects of the game. Eg: RTS, Co-Op</small>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <label className="form-label mt-4">Developers</label>
                                        <input type="text" className="form-control" placeholder="Developers"
                                               onChange={(e)=>this.updateDataField("developers", e.target.value)}
                                               value={this.getDataField("developers","")}
                                        />
                                        <small className="form-text text-muted">Semicolon (;) seperated list of those accredited with creating the game.</small>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label className="form-label mt-4">Game Type</label>
                                        <select multiple="" className="form-select"
                                                onChange={(e)=>this.updateDataField("gameType", parseInt(e.target.value))}
                                                value={this.getDataField("gameType",0)}
                                        >
                                            <option value={0}>Board Game</option>
                                            <option value={1}>Video Game</option>
                                        </select>
                                        <small className="form-text text-muted">Key words that describe aspects of the game. Eg: RTS, Co-Op</small>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <label className="form-label mt-4">Development State</label>
                                        <select multiple="" className="form-select"
                                                onChange={(e)=>this.updateDataField("state", parseInt(e.target.value))}
                                                value={this.getDataField("state",0)}
                                        >
                                            <option value={0}>Idea</option>
                                            <option value={1}>Design</option>
                                            <option value={2}>Testing</option>
                                            <option value={3}>Print Release</option>
                                            <option value={4}>Quality Release</option>
                                        </select>
                                        <small className="form-text text-muted">The names of those accredited with creating the game.</small>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <div className="form-group">
                                        <label className="form-label mt-4">Image Links</label>
                                        <input type="text" className="form-control" placeholder="Images"
                                               onChange={(e)=>this.updateDataField("imageURLs", e.target.value)}
                                               value={this.getDataField("imageURLs","")}
                                        />
                                        <small className="form-text text-muted">Semicolon (;) seperated list of links to images for the game</small>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <div className="form-group">
                                        <label className="form-label mt-4">Description</label>
                                        <textarea className="form-control" rows="3"
                                                  onChange={(e)=>this.updateDataField("description", e.target.value)}
                                                  value={this.getDataField("description","")}
                                        ></textarea>
                                        <small className="form-text text-muted">A broad description of the game, including mechanics, context and any other details you wish.</small>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <div className="form-group">
                                        <input className="form-check-input" type="checkbox"
                                               onChange={(e)=>this.updateDataField("visible", e.target.checked)}
                                               checked={this.getDataField("visible",false)}
                                        />
                                        <label className="form-check-label">List Game Publicly</label>
                                    </div>
                                    <small id="emailHelp" className="form-text text-danger">{this.state.error}</small>
                                    <hr/>
                                    <button type="button" className="btn btn-outline-success" onClick={()=>this.saveGame()}>Save</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </CenteredDiv>;
    }

    async saveGame(){
        var that = this;

        var keys = Object.keys(this.state.data).length;

        if (keys < 10){
            that.setState({error: "Please Fill In All Fields Before Saving"});
            return;
        }

        var url = this.state.mode == 0 ? "games/create" : "games/update";

        var req = new APIRequest(url, this.state.data, "POST");
        await req.executeWithCallback(
            (d) => {
                that.setState({error: "", data: d, mode: 1});
            },
            (d) => {
                that.setState({error: d["detail"]});
            });
    }
}
