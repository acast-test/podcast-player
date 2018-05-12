import React from 'react';
import { mount } from 'enzyme';
import { Podcasts } from './Podcasts';

describe('<Podcasts />', () => {
    it('fetches episodes', () => {
        // arrange
        const fetchEpisodes = jest.fn();

        // act
        const wrapper = mount(<Podcasts fetchEpisodes={fetchEpisodes} />);

        // assert
        expect(fetchEpisodes).toHaveBeenCalled();
    });

    it('renders <audio /> element if currentEpisode is passed', () => {
        // arrange
        const currentEpisode = { id: 'short' };
        const episodes = [currentEpisode];

        // act
        const wrapper = mount(
            <Podcasts currentEpisode={currentEpisode} episodes={episodes} />
        );

        // assert
        expect(wrapper.find('audio')).toHaveLength(1);
    });

    it('does not render <audio /> if currentEpisode is empty', () => {
        // arrange
        const currentEpisode = {};
        const episodes = [{ id: 'short' }];

        // act
        const wrapper = mount(
            <Podcasts currentEpisode={currentEpisode} episodes={episodes} />
        );

        // assert
        expect(wrapper.find('audio')).toHaveLength(0);
    });

    it('calls `playEpisode` with current episode id', () => {
        // might rename function to start with on, ie onPlayEpisode maybe...
        const playEpisode = jest.fn();
        const currentEpisode = { id: 'short' };
        const episodes = [currentEpisode];

        const wrapper = mount(
            <Podcasts
                currentEpisode={currentEpisode}
                episodes={[currentEpisode]}
                playEpisode={playEpisode}
            />
        );

        wrapper.find('.play-episode').simulate('click');

        // assert
        expect(playEpisode).toHaveBeenCalledWith(currentEpisode.id);
    });

    it('renders spinner', () => {
        // act
        const wrapper = mount(<Podcasts />);

        // assert
        expect(wrapper.contains(<div>Loading</div>)).toBe(true);
    });
});
