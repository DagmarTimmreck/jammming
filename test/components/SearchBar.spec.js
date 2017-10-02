import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import SearchBar from '../../src/components/SearchBar/SearchBar';

describe('SearchBar', () => {
  it('should render an input and a button', () => {
    const wrapper = shallow(<SearchBar onSearch={() => {}} />);
    expect(wrapper.containsMatchingElement(<input />)).to.equal(true);
    //   <button>SEARCH</button>,
    // ])).to.equal(true);
  });
  it('should render the input with props.term', () => {
    const term = 'TestTerm';
    const wrapper = shallow(
      <SearchBar term={term} onTermChange={() => {}} onSearch={() => {}} />);
    expect(wrapper.find('input').html().includes(term)).to.equal(true);
  });
  it('should call onTermChange when somethig is entered', () => {
    const termSpy = spy();
    const wrapper = shallow(
      <SearchBar term="" onTermChange={termSpy} onSearch={() => {}} />);
    const input = wrapper.find('input');

    input.simulate('change', { target: {} });

    expect(termSpy.calledOnce).to.equal(true);
  });
  it('should call onSearch when button is clicked', () => {
    const searchSpy = spy();
    const wrapper = shallow(<SearchBar onSearch={searchSpy} />);
    const button = wrapper.find('.searchButton');

    button.simulate('click');

    expect(searchSpy.calledOnce).to.equal(true);
  });
});
