import {Component} from "react";

export default class CenteredDiv extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (<div style={{
            ...this.props.style,
            height: this.props.height+this.props.sizerHeight,
            width: this.props.width+this.props.sizerWidth,
            position: "fixed",
            top:"50%",
            left: "50%",
            marginTop: (this.props.height/-2)+this.props.sizerHeight,
            marginLeft: (this.props.width/-2)+this.props.sizerWidth
        }}>
            {this.props.children}
        </div>)
    }
}
