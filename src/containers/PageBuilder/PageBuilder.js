import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import GrapesEditor from "../../components/GrapesEditor";

export class PageBuilder extends React.Component {

  render() {
    const { router } = this.props;
    const { query } = router.location;

    return (
      <>
        <GrapesEditor storeId={ query.storeId } />
      </>
    );
  }
}

PageBuilder.propTypes = {
  router: PropTypes.object,
}

const mapStateToProps = (state) => ({
  router: state.router
});

export default connect(mapStateToProps)(withRouter(PageBuilder));
