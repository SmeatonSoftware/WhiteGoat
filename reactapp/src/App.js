import './App.css';
import Welcome from "./components/welcome";
import {Component} from "react";
import Browse from "./components/browse";
import About from "./components/about";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {page: 0, data: {}};
    }

    changePage(_page = 0, _data = {}){
        this.setState({page: _page, data: _data});
    }

    render() {
        var that = this;

        var cPage = (p,d)=>that.changePage(p,d);

        var _selectedPage = <Welcome pageChange={cPage}/>;

        switch (this.state.page) {
            case 0:
                _selectedPage = <Welcome pageChange={cPage}/>;
                break;
            case 1:
                _selectedPage = <Browse pageChange={cPage}/>;
                break;
            case 2:
                _selectedPage = <About pageChange={cPage}/>;
                break;
        }

        return (
            <div className="App">
                {_selectedPage}
            </div>
        );
    }
}
