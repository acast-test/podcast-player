import * as selectors from './selectors';

describe('podcasts selectors', () => {
    it('gets current episode', () => {
        // arrange
        const id = 'short';
        const state = {
            episodes: [{id}],
            currentlyPlaying: 'short'
        };

        // act
        const episode = selectors.getCurrentEpisode(state);

        // assert
        expect(episode.id).toBe(id);
    });

    it('returns empty object if no episode found', () => {
        // arrange
        const state = {
            episodes: [],
            currentlyPlaying: 'short'
        };

        // act
        const episode = selectors.getCurrentEpisode(state);

        // assert
        expect(episode).toEqual({});
    });

    it('gets current marker', () => {
        // arrange
        const markerId = 'foo';
        const state = {
            episodes: [
                {
                    id: 'short',
                    markers: [
                        {
                            id: markerId,
                            start: 0,
                            duration: 10
                        }
                    ]
                }
            ],
            currentlyPlaying: 'short',
            currentEpisodeTime: 5
        };

        // act
        const marker = selectors.getCurrentMarker(state);

        // assert
        expect(marker.id).toBe(markerId);
    });

    it('returns empty object if no marker is found', () => {
        // arrange
        const state = {
            episodes: [
                {
                    id: 'short',
                    markers: []
                }
            ],
            currentlyPlaying: 'short',
            currentEpisodeTime: 5
        };

        // act
        const marker = selectors.getCurrentMarker(state);

        // assert
        expect(marker).toEqual({});
    });
});
