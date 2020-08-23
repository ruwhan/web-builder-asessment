import React from 'react';
import { connect } from "react-redux";

import Routes from "./Routes";
import Sidebar from "./components/Sidebar";
import { loadSavedPages, navigateToBuildPages } from "./actions";
import { generateRandomId, mapSavedPages } from "./utils";

class App extends React.Component  {
  constructor(props) {
    super(props);

    this.loadSavedPages = props.loadSavedPages;
    this.navigateToBuildPages = props.navigateToBuildPages;
  }

  componentDidMount() {
    this.loadSavedPages();
  }

  handleClickCreateNew = () => {
    this.navigateToBuildPages(generateRandomId());
  }

  render() {
    const { slice } = this.props;

    return (
      <div>
        <Sidebar menuList={mapSavedPages(slice)} onClickCreateNew={this.handleClickCreateNew} />
        <Routes />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  slice: state.slice
});

const mapDispatchToProps = {
  loadSavedPages,
  navigateToBuildPages,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
