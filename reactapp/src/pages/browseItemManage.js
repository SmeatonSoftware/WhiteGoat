import BetterComponent from "../shared/betterComponent";
import CenteredDiv from "../components/centeredDiv";
import GoatBar from "../components/goatBar";
import "../styling/BrowseItemManage.scss";

export default class BrowseItemManage extends BetterComponent{
    constructor(props) {
        super(props);
        this.state = {data: this.props.data};
    }


// public string Title { get; set; }
// public string Summary { get; set; }
// public string Description { get; set; }
// public string PrimaryImageURL { get; set; }
// public string Developers { get; set; }
// public string Tags { get; set; }
// public ListingState State { get; set; }
// public GameType GameType { get; set;}
// public bool Visible { get; set; }
// public int CreatorUserId { get; set; }

    updateDataField(field, value){
        var d = this.state.data;
        d[field] = value;

        console.log(d);

        this.setState({data: d});
    }

    getDataField(field, _default){
        var d = this.state.data;

        var v = d[field];

        return v == null ? _default : v;
    }

    render() {
        return <CenteredDiv height={98} sizerHeight={"vh"} width={98} sizerWidth={"vw"}>
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
                        </tbody>
                    </table>

                </div>
            </div>
        </CenteredDiv>;
    }
}
