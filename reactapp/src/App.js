import './App.css';
import Welcome from "./pages/welcome";
import {Component} from "react";
import Browse from "./pages/browse";
import About from "./pages/about";
import Login from "./pages/login";

export default class App extends Component {
    constructor(props) {
        super(props);

        var _page = localStorage.getItem("page");

        this.state = {page: _page == null ? 0 : parseInt(_page), data: {}};
    }

    changePage(_page = 0, _data = {}) {
        localStorage.setItem("page", _page);
        this.setState({page: _page, data: _data});
    }

    render() {
        var that = this;

        var cPage = (p, d) => that.changePage(p, d);

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
            case 3:
                _selectedPage = <Login pageChange={cPage}/>;
                break;
        }

        return (
            <div className="App">
                {_selectedPage}
            </div>
        );
    }
}
