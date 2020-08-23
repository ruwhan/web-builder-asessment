import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { loadSavedPages, navigateToActualPage } from "../../actions";
import { findSavedPages } from "../../utils";

export class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.loadSavedPages = props.loadSavedPages;
    this.navigateToActualPage = props.navigateToActualPage;
  }

  componentDidMount() {
    this.loadSavedPages();
  }

  render() {
    const { params } = this.props.match;
    const { slice } = this.props;
    const savedPage = findSavedPages(params.id, slice.entities);

    if (savedPage) {
      setTimeout(() => {
        window.document.getElementById('landing_page').innerHTML =
          `<style>${savedPage['gjs-css']}</style>
          ${savedPage['gjs-html']}`
        
      }, 0);
    }
    
    return (
      <div id="landing_page"></div>
    );
  }
}

LandingPage.propTypes = {
  navigateToActualPage: PropTypes.func,
}

const mapStateToProps = (state) => ({
  slice: state.slice,
})

const mapDispatchToProps = {
  loadSavedPages,
  navigateToActualPage,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LandingPage));
