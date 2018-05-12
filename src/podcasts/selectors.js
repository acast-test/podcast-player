import * as R from 'ramda';
import { createSelector } from 'reselect';

const getEpisodes = (state) => state.episodes;
const getCurrentlyPlaying = (state) => state.currentlyPlaying;
const getCurrentEpisodeTime = (state) => state.currentEpisodeTime;

export const getCurrentEpisode = createSelector(
    getEpisodes,
    getCurrentlyPlaying,
    (episodes, currentEpisodeId) => {
        const episode = R.find(R.propEq('id', currentEpisodeId), episodes)
        return episode || {};
    }
)

export const getCurrentMarker = createSelector(
    getCurrentEpisode,
    getCurrentEpisodeTime,
    (episode, currentTime) => {
        const currentMarker = R.find(
            (marker) => marker.start <= currentTime && currentTime <= marker.start + marker.duration,
            episode.markers || []
        )

        return currentMarker || {}
    }
)