import React from 'react';
import Refresh from './Refresh';
import { mount } from 'enzyme'

it('renders without crashing', () => {
  mount(<Refresh />);
});
