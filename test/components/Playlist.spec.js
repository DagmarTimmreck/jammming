import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import Playlist from '../../src/components/Playlist/Playlist';
import TrackList from '../../src/components/TrackList/TrackList';

describe('Playlist', () => {
  it('should render an input, a TrackList and a save button', () => {
    const wrapper = shallow(<Playlist title="" tracks={[]} onRemoveTrack={() => {}} onTitleChange={() => {}} onSave={() => {}} />);
    expect(wrapper.find(TrackList), 'TrackList').to.have.length(1);
    expect(wrapper.find('button'), 'button').to.have.length(1);
    expect(wrapper.find('input'), 'input').to.have.length(1);
  });
  it('should render the input with props.title', () => {
    const title = 'TestList';
    const wrapper = shallow(
      <Playlist title={title} tracks={[]} onRemoveTrack={() => {}} onTitleChange={() => {}} onSave={() => {}} />);
    expect(wrapper.find('input').html().includes(title)).to.equal(true);
  });
  it('should call onTitleChange when somethig is entered', () => {
    const titleSpy = spy();
    const wrapper = shallow(
      <Playlist title="" tracks={[]} onRemoveTrack={() => {}} onTitleChange={titleSpy} onSave={() => {}} />);
    const input = wrapper.find('input');

    input.simulate('change', { target: {} });

    expect(titleSpy.calledOnce).to.equal(true);
  });
  it('should call onSave when save button is clicked', () => {
    const saveSpy = spy();
    const wrapper = shallow(
      <Playlist
        title=""
        tracks={[]}
        onRemoveTrack={() => {}}
        onTitleChange={() => {}}
        onSave={saveSpy}
      />);
    const button = wrapper.find('button');

    button.simulate('click', { target: {} });

    expect(saveSpy.calledOnce).to.equal(true);
  });
});
