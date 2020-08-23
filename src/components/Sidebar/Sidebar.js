import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./Sidebar.scss";

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.onClickCreateNew = props.onClickCreateNew;
  }

  /**
   * On click create new event handler.
   * 
   * @param {Event} e
   */
  handleClickCreateNew = (e) => {
    e.preventDefault();

    this.onClickCreateNew();
  }

  /**
   * Render saved page name list.
   * 
   * @returns {[DOM]}
   */
  renderSavedPages() {
    return [
      <li key="new"><a href="/build" onClick={this.handleClickCreateNew}>&#43; Create New</a></li>,
      ...this.props.menuList.map((item) => (
          <li key={item.id} className="edit-link">
            <Link to={`/build?storeId=${item.id}`}>{item.id}</Link>
            &nbsp;|&nbsp;
            <Link to={`/page/${item.id}`}>See</Link>
          </li>))
    ]
  }

  render() {
    return (
      <div className="sidebar">
        <Link to={"/"} className="back-link">&lt;&nbsp;back</Link>
        <ul>
          { this.renderSavedPages() }
        </ul>
      </div>
    );
  }
}

Sidebar.propTypes = {
  menuList: PropTypes.array,
  onClickCreateNew: PropTypes.func.isRequired,
}

export default Sidebar;
