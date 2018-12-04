import React from 'react';
import SignupPage from '../components/SignupPage';
import ProfilePage from '../components/ProfilePage';
import LoginPage from '../components/LoginPage';
import TimeTable from '../components/TimeTable'
import renderer from 'react-test-renderer';
import ExplorePage from '../components/ExplorePage';
import FriendPage from '../components/FriendPage';
import SendPostPage from '../components/SendPostPage';
import SetCalendarPage from '../components/SetCalendarPage';
import PostComment from '../components/PostComment';
import FriendProfile from '../components/FriendProfile';

it('test friendprofile page renders correctly', () => {
  const out = renderer
    .create(<FriendProfile />)
    .toJSON();
  expect(out).toMatchSnapshot();
});

it('test signup page renders correctly', () => {
  const out = renderer
    .create(<PostComment />)
    .toJSON();
  expect(out).toMatchSnapshot();
});


it('test signup page renders correctly', () => {
  const out = renderer
    .create(<SignupPage />)
    .toJSON();
  expect(out).toMatchSnapshot();
});

it('test profile page renders correctly', () => {
    const out = renderer
      .create(<ProfilePage />)
      .toJSON();
    expect(out).toMatchSnapshot();
});

it('test signup page renders correctly', () => {
    const out = renderer
      .create(<LoginPage />)
      .toJSON();
    expect(out).toMatchSnapshot();
});

it('test TimeTable page renders correctly', () => {
    const out = renderer
      .create(<TimeTable />)
      .toJSON();
    expect(out).toMatchSnapshot();
});

it('test ExplorePage renders correctly', () => {
  const out = renderer
    .create(<ExplorePage  />)
    .toJSON();
  expect(out).toMatchSnapshot();
});

it('test FriendPage renders correctly', () => {
  const out = renderer
    .create(<FriendPage />)
    .toJSON();
  expect(out).toMatchSnapshot();
});

it('test SendPostPage renders correctly', () => {
  const out = renderer
    .create(<SendPostPage />)
    .toJSON();
  expect(out).toMatchSnapshot();
});

it('test SetCalendarPage renders correctly', () => {
  const out = renderer
    .create(<SetCalendarPage />)
    .toJSON();
  expect(out).toMatchSnapshot();
});
