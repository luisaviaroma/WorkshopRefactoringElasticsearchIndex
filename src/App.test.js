import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import {describe, it, expect, run } from 'jest-lite';
import * as prettify from 'jest-lite/dist/prettify';
import 'jest-lite/dist/prettify.css';
import App from './App.books';

export default () => {
    
  describe('render searchkit', () => {
    
    // Render component
    const div = document.createElement('div');
    ReactDOM.render(
      <App />,
      div
    );

    // Promise that wait for elasticsearch call and result rendering
    const poll = (resolve) => {
      var hitsdisplayed = div.querySelectorAll('[data-qa="hits"] [data-qa="hit"]').length > 0;
      var nothitmessagedisplayed = div.querySelectorAll('[data-qa="no-hits"]').length > 0;
    
      if(hitsdisplayed || nothitmessagedisplayed) resolve({ hitsdisplayed, nothitmessagedisplayed });
      else setTimeout(_ => poll(resolve), 100);
    };
    const renderpromise = new Promise(poll);

    // Test
    it('without errors', () => {
      const promise = renderpromise.then(result => {
        const { hitsdisplayed, nothitmessagedisplayed } = result;
        return hitsdisplayed || nothitmessagedisplayed;
      });
      return expect(promise).resolves.toEqual(true);
    });
    
    it('with hits', () => {
      const promise = renderpromise.then(result => {
        const { hitsdisplayed, nothitmessagedisplayed } = result;
        return hitsdisplayed;
      });
      return expect(promise).resolves.toEqual(true);
    });
    
  });

  prettify.toHTML(run(), document.body);

};