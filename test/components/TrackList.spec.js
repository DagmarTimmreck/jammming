import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import TrackList from '../../src/components/TrackList/TrackList';

describe('TrackList', () => {
  it('should render an unordered list', () => {
    const wrapper = shallow(<TrackList tracks={[]} action={{ symbol: 'x', func: () => {} }} />);
    expect(wrapper.find('ul').length).to.equal(1);
  });
  it('should render zero items', () => {
    const wrapper = shallow(<TrackList tracks={[]} action={{ symbol: 'x', func: () => {} }} />);
    expect(wrapper.find('li')).to.have.length(0);
  });

  it('should render some items', () => {
    const track = {
      id: '123',
      title: 'Tiny Dancer',
      artist: 'Elton John',
      album: 'Madman Across The Water',
    };
    const action = {
      symbol: '+',
      func: () => {},
    };
    const wrapper = mount(<TrackList tracks={[track]} action={action} />);
    expect(wrapper.find('li')).to.have.length(1);
  });
});
