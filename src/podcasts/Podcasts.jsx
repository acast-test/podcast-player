import React from 'react';
import {connect} from 'react-redux';
import * as podcastActions from './actions';
import * as podcastSelectors from './selectors';
import {actions as errorActions} from '../errors';
import Marker from './Marker';
import * as R from 'ramda';
import PropTypes from 'prop-types';

class Podcasts extends React.Component {
    componentDidMount() {
        this.props.fetchEpisodes();
    }

    handleSeeking = () => {
        if (
            this.props.currentMarker.type === 'ad' &&
            this.audio.currentTime - this.props.currentEpisodeTime > 0
        ) {
            // update pendingSeek only if user seeks to the time point after ad
            if (
                this.audio.currentTime >
                this.props.currentMarker.start +
                    this.props.currentMarker.duration
            ) {
                this.props.updatePendingSeek(this.audio.currentTime);
            }

            this.audio.currentTime = this.props.currentEpisodeTime;
        }
    };

    handleTimeUpdate = () => {
        if (!this.audio.seeking) {
            this.props.updateCurrentEpisodeTime(this.audio.currentTime);

            if (
                this.props.currentMarker.type !== 'ad' &&
                this.props.pendingSeek
            ) {
                this.audio.currentTime = this.props.pendingSeek;
                this.props.updatePendingSeek(0);
            }
        }
    };

    handleForwardClick = () => {
        this.audio.currentTime += 5;
        this.handleSeeking();
    };

    handleBackWardClick = () => {
        this.audio.currentTime -= 5;
        this.handleSeeking();
    };

    handleInputChange = event => {
        this.props.updateJumptoTime(event.target.value);
    };

    handleJumptoTimeClick = () => {
        this.audio.currentTime = this.props.jumptoTime;
        this.handleSeeking();
    };

    handlePlayEpisode = id => () => {
        this.props.playEpisode(id);
    };

    render() {
        if (this.props.episodes.length === 0) {
            // should be a spinner here
            return <div>Loading</div>;
        }

        const episodes = this.props.episodes.map(episode => (
            <li key={episode.id} style={{marginBottom: '1rem'}}>
                <a
                    className="play-episode"
                    href="#"
                    onClick={this.handlePlayEpisode(episode.id)}
                >
                    {episode.name}
                </a>
            </li>
        ));

        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <ul style={{listStyle: 'none'}}>{episodes}</ul>
                </div>
                {!R.isEmpty(this.props.currentEpisode) && (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <audio
                            controls
                            style={{border: '1px solid black'}}
                            ref={audio => {
                                this.audio = audio;
                            }}
                            src={`http://localhost:1337/${
                                this.props.currentEpisode.audio
                            }`}
                            onTimeUpdate={this.handleTimeUpdate}
                            onSeeking={this.handleSeeking}
                        />
                        <button
                            style={{
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                borderColor: '#4CAF50',
                                borderRadius: '50%',
                                marginLeft: '1em',
                                outline: 'none'
                            }}
                            onClick={this.handleForwardClick}
                        >
                            +5s
                        </button>
                        <button
                            style={{
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                borderColor: '#4CAF50',
                                borderRadius: '50%',
                                outline: 'none'
                            }}
                            onClick={this.handleBackWardClick}
                        >
                            -5s
                        </button>
                        <input
                            style={{
                                maxWidth: '100px',
                                marginLeft: '0.5rem',
                                borderRadius: '6px',
                                outline: 'none'
                            }}
                            type="number"
                            value={this.props.jumptoTime}
                            onChange={this.handleInputChange}
                        />
                        <button
                            style={{
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                textShadow: '3px 2px 1px #9daef5',
                                borderColor: '#4CAF50',
                                marginLeft: '0.2em',
                                outline: 'none',
                                borderRadius: '6px'
                            }}
                            onClick={this.handleJumptoTimeClick}
                        >
                            jump to specified time
                        </button>
                    </div>
                )}
                {this.props.currentEpisodeTime > 0 &&
                    this.props.currentEpisodeTime < this.audio.duration && (
                        <div style={{marginTop: '2rem'}}>
                            <Marker
                                content={this.props.currentMarker.content}
                                link={this.props.currentMarker.link}
                                type={this.props.currentMarker.type}/>
                        </div>
                    )}
            </div>
        );
    }
}

const noop = () => {};

Podcasts.defaultProps = {
    episodes: [],
    errors: [],
    fetchEpisodes: noop,
    playEpisode: noop,
    updateCurrentEpisodeTime: noop,
    updateJumptoTime: noop,
    updatePendingSeek: noop
};

Podcasts.propTypes = {
    currentEpisode: PropTypes.object,
    currentEpisodeTime: PropTypes.number,
    currentMarker: PropTypes.object,
    episodes: PropTypes.array,
    errors: PropTypes.array,
    fetchEpisodes: PropTypes.func.isRequired,
    pendingSeek: PropTypes.number,
    playEpisode: PropTypes.func.isRequired,
    updateCurrentEpisodeTime: PropTypes.func.isRequired,
    updateJumptoTime: PropTypes.func.isRequired,
    updatePendingSeek: PropTypes.func.isRequired
};

function connectStateToProps(state) {
    return {
        episodes: R.path(['podcasts', 'episodes'], state),
        currentEpisode: podcastSelectors.getCurrentEpisode(state.podcasts),
        currentEpisodeTime: R.path(['podcasts', 'currentEpisodeTime'], state),
        currentMarker: podcastSelectors.getCurrentMarker(state.podcasts),
        pendingSeek: R.path(['podcasts', 'pendingSeek'], state),
        jumptoTime: R.path(['podcasts', 'jumptoTime'], state),
        errors: state.errors
    };
}

export default connect(connectStateToProps, {
    fetchEpisodes: () =>
        podcastActions.fetchEpisodes(
            ({value}) => podcastActions.storeEpisodes(value),
            error => errorActions.raiseError(error.message)
        ),
    playEpisode: id => podcastActions.playEpisode(id),
    updateCurrentEpisodeTime: time =>
        podcastActions.updateCurrentEpisodeTime(time),
    updatePendingSeek: time => podcastActions.updatePendingSeek(time),
    updateJumptoTime: time => podcastActions.updateJumptoTime(time)
})(Podcasts);

export {Podcasts};
