import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SearchResults from '../../src/components/SearchResults/SearchResults';
import TrackList from '../../src/components/TrackList/TrackList';

describe('SearchResults', () => {
  it('should render a TrackList', () => {
    const wrapper = shallow(<SearchResults tracks={[]} onAddTrack={() => {}} />);
    expect(wrapper.find(TrackList)).to.have.length(1);
  });
});
