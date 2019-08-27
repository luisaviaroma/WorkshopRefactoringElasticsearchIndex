import React from 'react';
import ReactDOM from 'react-dom';
import AppDemo from './App.demo';
import AppBooks from './App.books';
import AppFifa from './App.fifa';
import StartTest from './App.test';
import './index.css';

var istest = window.location.hash === '#test';
var isbook = window.location.hash === '#book';
var isfifa = window.location.hash === '#fifa';
var isdemo = !istest && !isbook && !isfifa;

if (isdemo || isbook || isfifa) {
  var root = document.getElementById('root');

  ReactDOM.render(
    <div>
      {isdemo && <AppDemo />}
      {isbook && <AppBooks />}
      {isfifa && <AppFifa />}
    </div>,
    root
  );
}

if (istest) {
  StartTest();
}