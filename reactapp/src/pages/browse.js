import {Component} from "react";
import CenteredDiv from "../components/centeredDiv";
import BrowseItem from "../components/browseItem";
import GoatBar from "../components/goatBar";
import APIRequest from "../shared/request";
import BetterComponent from "../shared/betterComponent";
import "../styling/Browse.scss";

export default class Browse extends BetterComponent {
    constructor(props) {
        super(props);
        this.state = {gameType: 0, query: "", listingData: []}
    }

    async searchGames(){
        var that = this;
        var req = new APIRequest("games/search?gameType="+this.state.gameType+"&query="+this.state.query, "", "GET");
        await req.executeWithCallback(
            (d) => {
                that.setState({listingData: d});
            },
            (d) => {
            }, true);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.query!=this.state.query || prevState.gameType!=this.state.gameType){
            this.searchGames();
        }
    }

    componentFirstMount() {
        this.searchGames();
    }

    render() {
        return <CenteredDiv height={98} sizerHeight={"vh"} width={98} sizerWidth={"vw"}>
            <div className={"container"} style={{overflow: "scroll", maxHeight:"100%"}}>
                <div className={"row"}>
                    <div className={"col-sm"}>
                        <div className="card border-primary mb-3" style={{width:"100%"}}>
                            <GoatBar title={"Browse White Goat Games"} pageChange={this.props.pageChange}/>
                            <div className="card-body">
                                <div className="form-group">
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder="Game Title or Keywords"
                                           onChange={(e)=>this.setState({query: e.target.value})}
                                    />
                                    <small id="emailHelp" className="form-text text-muted">If You Know The Game You Are Looking For
                                        Or Some Key Words</small>

                                </div>
                                <div className="form-group">
                                    <div className={"container"}>
                                        <div className={"row"}>
                                            <div className={"col-sm"}>
                                                <label htmlFor="gameType" className="form-label mt-4">Game Type</label>
                                                <select className="form-select" id="gameType" onChange={(e)=>this.setState({gameType: e.target.value})}>
                                                    <option value={0}>Board Game</option>
                                                    <option value={1}>Video Game</option>
                                                </select>
                                            </div>
                                            <div className={"col-sm"}>
                                                <div style={{verticalAlign:"bottom"}}>
                                                    <button hidden={!this.isAdmin()} type="button" className="btn btn-outline-warning" style={{marginRight: "1vw", width: "40%"}}
                                                            onClick={()=>this.props.pageChange(11)}>New</button>
                                                    <button type="button" className="btn btn-outline-success" style={{width: "40%"}}>Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-sm"}>
                        <div>
                            <div style={{height: "100%"}}>
                                {
                                    this.state.listingData.map(
                                        x=> <BrowseItem data={x} pageChange={this.props.pageChange} key={x.id}/>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </CenteredDiv>;
    }
}
