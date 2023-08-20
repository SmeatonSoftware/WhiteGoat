import {Component} from "react";

export default class ImagePanel extends Component{
    constructor(props) {
        super(props);

        this.state = {images: props.images.split(";").filter(x=>x.length>5), idx: 0};
    }

    changeImage(dir){
        var idx = (this.state.idx + dir) % this.state.images.length;

        this.setState({idx: idx});
    }

    render() {
        return <div style={{maxWidth: "30%", float:"left"}}>
            <img style={{maxWidth:"100%"}} src={this.state.images[this.state.idx]}/>
            <button type="button" className="btn btn-primary" onClick={()=>this.changeImage(-1)}>&lt;</button>
            <button type="button" className="btn btn-primary" onClick={()=>this.changeImage(1)}>&gt;</button>
        </div>
    }
}
