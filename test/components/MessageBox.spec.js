import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import MessageBox from '../../src/components/MessageBox/MessageBox';

it('should render props.message', () => {
  const message = 'TestMessage';
  const wrapper = shallow(<MessageBox message={message} />);
  expect(wrapper.find('input').html().includes(message)).to.equal(true);
});
