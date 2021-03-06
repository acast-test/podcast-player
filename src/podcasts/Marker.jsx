import React from 'react';
import PropTypes from 'prop-types';
import './Marker.scss';

function Marker(props) {
    return (
        <div className="marker">
            {props.type === 'ad' && (
                <a
                    href={props.link}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    {props.content}
                </a>
            )}
            {props.type === 'text' && (
                <div>{props.content}</div>
            )}
            {props.type === 'image' && (
                <img src={`http://localhost:1337/${props.content}`} />
            )}
        </div>
    )
}

Marker.propTypes = {
    type: PropTypes.oneOf(['ad', 'text', 'image']),
    content: PropTypes.string,
    link: PropTypes.string
}

export default Marker;
