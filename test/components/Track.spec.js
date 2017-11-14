import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import Track from '../../src/components/TrackList/Track/Track';

const sampleTrack = {
  id: '123',
  title: 'Tiny Dancer',
  artist: 'Elton John',
  album: 'Madman Across The Water',
};

describe('Track', () => {
  it('should render Track-information and Track-action', () => {
    const action = {
      symbol: '',
      func: () => {},
    };
    const wrapper = shallow(<Track track={sampleTrack} action={action} />);
    expect(wrapper.find('.Track-information').exists()).to.equal(true);
    expect(wrapper.find('.Track-action').exists()).to.equal(true);
  });
  it('should render using the right props', () => {
    const action = {
      symbol: 'x',
      func: () => {},
    };
    const wrapper = shallow(<Track track={sampleTrack} action={action} />);
    const renderedtrack = wrapper.find('.Track-information').text();
    expect(wrapper.find('.Track-action').text().includes(action.symbol)).to.equal(true);
    expect(renderedtrack.includes(sampleTrack.title)).to.equal(true);
    expect(renderedtrack.includes(sampleTrack.artist)).to.equal(true);
    expect(renderedtrack.includes(sampleTrack.album)).to.equal(true);
  });
  it('should call action.func when Track-action is clicked', () => {
    const actionSpy = spy();
    const sampleAction = {
      symbol: 'x',
      func: actionSpy,
    };
    const wrapper = shallow(<Track track={sampleTrack} action={sampleAction} />);
    const trackAction = wrapper.find('.Track-action');

    trackAction.simulate('click');

    expect(actionSpy.calledOnce).to.equal(true);
    expect(actionSpy.calledWith(sampleTrack)).to.equal(true);
  });
});
