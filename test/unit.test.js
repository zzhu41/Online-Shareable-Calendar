import React from 'react';
import SignupPage from '../components/SignupPage';
import ProfilePage from '../components/ProfilePage';
import LoginPage from '../components/LoginPage';
import TimeTable from '../components/TimeTable'
import renderer from 'react-test-renderer';

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

it('test signup page renders correctly', () => {
    const out = renderer
      .create(<TimeTable />)
      .toJSON();
    expect(out).toMatchSnapshot();
});
