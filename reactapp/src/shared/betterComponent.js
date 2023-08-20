import {Component} from "react";

export default class BetterComponent extends Component{
    constructor(props) {
        super(props);
        this.mountId = 0;
    }

    componentDidMount() {
        if (this.mountId==0)
            this.componentFirstMount();
        else
            this.componentSecondMount();

        this.mountId++;
    }

    componentFirstMount(){

    }

    componentSecondMount(){

    }

    getUser(){
        var u = localStorage.getItem("user");

        if (u==null) return null;

        u = JSON.parse(u);

        return u;
    }

    isAdmin(){
        var u = this.getUser();

        return u!= null && u["authLevel"]==2;
    }
}
