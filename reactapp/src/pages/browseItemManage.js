import BetterComponent from "../shared/betterComponent";
import CenteredDiv from "../components/centeredDiv";
import GoatBar from "../components/goatBar";

export default class BrowseItemManage extends BetterComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return <CenteredDiv height={98} sizerHeight={"vh"} width={98} sizerWidth={"vw"}>
            <div className="card border-primary mb-3" style={{minWidth:"100%", minHeight: "100%"}}>
                <GoatBar title={"Manage A Game"} pageChange={this.props.pageChange}/>

            </div>
        </CenteredDiv>;
    }
}
