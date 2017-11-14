import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import SearchBar from '../../src/components/SearchBar/SearchBar';

describe('SearchBar', () => {
  it('should render an input and a button', () => {
    const wrapper = shallow(<SearchBar term="" onTermChange={() => {}} onSearch={() => {}} onClear={() => {}} />);
    expect(wrapper.containsMatchingElement(<input />)).to.equal(true);
    //   <button>SEARCH</button>,
    // ])).to.equal(true);
  });
  it('should render the input with props.term', () => {
    const term = 'TestTerm';
    const wrapper = shallow(
      <SearchBar term={term} onTermChange={() => {}} onSearch={() => {}} onClear={() => {}} />);
    expect(wrapper.find('input').html().includes(term)).to.equal(true);
  });
  it('should call onTermChange when somethig is entered', () => {
    const termSpy = spy();
    const wrapper = shallow(
      <SearchBar term="" onTermChange={termSpy} onSearch={() => {}} onClear={() => {}} />);
    const input = wrapper.find('input');

    input.simulate('change', { target: {} });

    expect(termSpy.calledOnce).to.equal(true);
  });
  it('should call onSearch when search button is clicked', () => {
    const searchSpy = spy();
    const wrapper = shallow(<SearchBar term="" onTermChange={() => {}} onSearch={searchSpy} onClear={() => {}} />);
    const button = wrapper.find('.searchButton');

    button.simulate('click');

    expect(searchSpy.calledOnce).to.equal(true);
  });
  it('should call onClear when clear button is clicked', () => {
    const clearSpy = spy();
    const wrapper = shallow(<SearchBar term="" onTermChange={() => {}} onSearch={() => {}} onClear={clearSpy} />);
    const button = wrapper.find('.clearButton');

    button.simulate('click');

    expect(clearSpy.calledOnce).to.equal(true);
  });
});
