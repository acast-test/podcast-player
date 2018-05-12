import React from 'react';
import { mount } from 'enzyme';
import { Errors } from './Errors';

describe('<Errors />', () => {
    it('renders correct amount of passed errors', () => {
        // arrange
        const errors = [{ id: 'foo', message: 'something went wrong' }];

        // act
        const wrapper = mount(<Errors errors={errors} />);

        // assert
        expect(wrapper.find('ul').children()).toHaveLength(1);
    });

    it('does not render errors', () => {
        // act
        const wrapper = mount(<Errors />);

        // assert
        expect(wrapper.find('ul')).toHaveLength(0);
    });
});
