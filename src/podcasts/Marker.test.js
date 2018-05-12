import React from 'react';
import {mount} from 'enzyme';
import Marker from './Marker';

describe('<Marker />', () => {
    it('renders link when type is ad', () => {
        // arrange
        const link = 'http://www.google.com';

        // act
        const wrapper = mount(<Marker type="ad" link={link} />);

        // assert
        expect(wrapper.find('a').prop('href')).toBe(link);
    });

    it('renders div when type is text', () => {
        // act
        const wrapper = mount(<Marker type="text" content="foo" />);

        // assert
        expect(wrapper.contains(<div>foo</div>)).toBe(true);
    });

    it('renders img when type is image', () => {
        // act
        const wrapper = mount(<Marker type="image" />);

        // assert
        expect(wrapper.find('img')).toHaveLength(1);
    });
});
