import React from 'react';
import Colors from './CustomComponent';
import { mount } from 'enzyme'

it('renders without crashing', () => {
  mount(<Colors />);
});
