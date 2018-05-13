import { connect } from "react-redux"
import * as R from "ramda"
import {getErrors} from './selectors';
import React from "react"
import PropTypes from "prop-types"
import './Errors.scss';

function Errors(props) {
    if (props.errors.length === 0) {
        return null
    }

    return (
        <ul className="errors">
            {props.errors.map(error => <li key={error.id}>{error.message}</li>)}
        </ul>
    )
}

Errors.defaultProps = { errors: [] }

Errors.propTypes = {
    errors: PropTypes.array
}

function mapStateToProps(state) {
    return {
        errors: getErrors(state.errors)
    }
}

export default connect(mapStateToProps)(Errors)
export { Errors }
