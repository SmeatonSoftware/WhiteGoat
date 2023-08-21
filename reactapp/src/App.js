import './styling/App.css';
import Welcome from "./pages/welcome";
import {Component} from "react";
import Browse from "./pages/browse";
import About from "./pages/about";
import Login from "./pages/login";
import BrowseItemManage from "./pages/browseItemManage";

export default class App extends Component {
    constructor(props) {
        super(props);

        var _page = localStorage.getItem("page");

        this.state = {page: _page == null ? 0 : parseInt(_page), data: {}};
    }

    changePage(_page = 0, _data = {}) {
        var pageStack = localStorage.getItem("pageStack");
        pageStack = pageStack == null ? [0, null] : JSON.parse(pageStack);
        pageStack.push([_page,_data]);

        console.log(pageStack);

        localStorage.setItem("pageStack", JSON.stringify(pageStack));
        this.setState({page: _page, data: _data});
    }

    render() {
        var that = this;

        var cPage = (p, d) => that.changePage(p, d);

        var _selectedPage = <Welcome pageChange={cPage}/>;

        switch (this.state.page) {
            case 0:
                _selectedPage = <Welcome pageChange={cPage} data={this.state.data}/>;
                break;
            case 1:
                _selectedPage = <Browse pageChange={cPage} data={this.state.data}/>;
                break;
            case 11:
                _selectedPage = <BrowseItemManage pageChange={cPage} data={this.state.data}/>
                break
            case 2:
                _selectedPage = <About pageChange={cPage} data={this.state.data}/>;
                break;
            case 3:
                _selectedPage = <Login pageChange={cPage} data={this.state.data}/>;
                break;
        }

        return (
            <div className="App">
                {_selectedPage}
            </div>
        );
    }
}
