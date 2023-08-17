import {Component} from "react";
import CenteredDiv from "../components/centeredDiv";
import BrowseItem from "../components/browseItem";
import GoatBar from "../components/goatBar";
import APIRequest from "../shared/request";
import BetterComponent from "../shared/betterComponent";

export default class Browse extends BetterComponent {
    constructor(props) {
        super(props);
        this.state = {gameType: 0, query: "", lisitingData: []}
    }

    async searchGames(){
        var that = this;
        var req = new APIRequest("games/search?gameType="+this.state.gameType+"&query="+this.state.query, "", "GET");
        await req.executeWithCallback(
            (d) => {
                that.setState({lisitingData: d});
            },
            (d) => {
            }, false);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.query!=this.state.query || prevState.gameType!=this.state.gameType){
            this.searchGames();
        }
    }

    componentSecondMount() {
        this.searchGames();
    }

    render() {
        return <CenteredDiv height={98} sizerHeight={"vh"} width={98} sizerWidth={"vw"}>
            <div className="card border-primary mb-3" style={{width:"100%", minHeight: "20%"}}>
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
                </div>
            </div>

            <div style={{overflow: "scroll", maxHeight: "78%"}}>
                <BrowseItem/>
                <BrowseItem/>
                <BrowseItem/>
            </div>
        </CenteredDiv>;
    }
}
