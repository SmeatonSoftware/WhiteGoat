import './App.css';
import Welcome from "./components/welcome";
import {Component} from "react";

export default class App extends Component{
    constructor(props) {
        super(props);

        this.state = {page: 0};
    }

    render() {
        var that = this;

        var _selectedPage = <Welcome pageChange={(p)=>that.setState({page: p})}/>;

        switch (this.state.page){
            case 0:
                _selectedPage = <Welcome pageChange={(p)=>that.setState({page: p})}/>;
                break;
            case 1:
                _selectedPage = <Welcome pageChange={(p)=>that.setState({page: p})}/>;
                break;
            case 2:
                _selectedPage = <Welcome pageChange={(p)=>that.setState({page: p})}/>;
                break;
        }

        return (
            <div className="App">
                {_selectedPage}
            </div>
        );
    }
}
