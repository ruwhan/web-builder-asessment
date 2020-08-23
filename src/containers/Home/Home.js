import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadSavedPages, navigateToBuildPages } from "../../actions";

import "./Home.css";
import logo from '../../logo.svg';
import { generateRandomId, mapSavedPages } from "../../utils";

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.loadSavedPages = props.loadSavedPages;
    this.navigateToBuildPages = props.navigateToBuildPages;
  }

  componentDidMount() {
    this.loadSavedPages();

    console.log(process.env);
  }

  /**
   * On click navigation button event handler.
   * 
   * @param {String} id The saved page id
   * @param {Event} e Event
   */
  handleClickId = (id, e) => {
    e.preventDefault();
    this.navigateToBuildPages(id);
  }

  /**
   * Array of saved pages.
   * 
   * @returns {[Object]}
   */
  mapSavedPages() {
    const { slice } = this.props;

    return mapSavedPages(slice);
  }

  /**
   * Render saved page name list.
   * 
   * @returns {[DOM]}
   */
  renderSavedPages() {
    return (
      <div>{[
        <div key="new"><a href="/build" onClick={(e) => this.handleClickId(this.generateRandomId(), e)}>Create New</a></div>,
        ...this.mapSavedPages().map((item) => (
            <div key={item.id} className="edit-link">
              <a href={`/build?storeId=${item.id}`} onClick={(e) => this.handleClickId(item.id, e)}>{item.id}</a>
              |
              <a href={`/page/${item.id}`} onClick={(e) => this.handleClickPage(item.id, e)}>View Page</a>
            </div>))
      ]}</div>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hover cursor to the most left side of the screen to see your pages, saved pages or create new pages.
          </p>
          <a href="/build" className="App-link" onClick={(e) => this.handleClickId(generateRandomId(), e)}>Create New</a>
        </header>
        { this.renderSavedPages() }
      </div>
    );
  }
}

Home.propTypes = {
  slice: PropTypes.object,
  loadSavedPages: PropTypes.func,
  navigateToBuildPages: PropTypes.func,
}

const mapStateToProps = (state) => ({
  slice: state.slice,
});

const mapDispatchToProps = {
  loadSavedPages,
  navigateToBuildPages,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
