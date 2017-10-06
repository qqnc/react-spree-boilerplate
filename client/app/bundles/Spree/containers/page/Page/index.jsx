import _ from "lodash"
import qs from "querystring"
import React, { Component } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { Page } from "../../../components/page"
import { load, loadPage } from "../../../redux/modules/page"
import Content from "./Content"

const parseQuery = search => (
  search ?
  qs.parse(search.slice(1)) :
  {}
)

class PageApp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
    loadPage: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(next) {
    const location = this.props.location
    const query = parseQuery(location.search)
    const nextLocation = next.location
    const nextQuery = parseQuery(nextLocation.search)
    if(nextLocation.pathname !== location.pathname) {
      this.load(next)
    } else if(nextQuery.page !== query.page) {
      this.loadPage(next)
    }
  }

  load({ location }) {
    const query = parseQuery(location.search)
    this.props.load(
      location.pathname,
      query.page || 1
    )
  }

  loadPage({ location }) {
    const query = parseQuery(location.search)
    this.props.loadPage(query.page || 1)
  }

  get restProps() {
    return _.without(
      this.props,
      "load",
      "history",
      "location",
      "match",
      "staticContext"
    )
  }

  render() {
    const { children } = this.props
    return <Page {...this.restProps}>{children}</Page>
  }
}

PageApp.Title = Page.Title

PageApp.Content = Content

export default connect(undefined, { load, loadPage })(withRouter(PageApp))