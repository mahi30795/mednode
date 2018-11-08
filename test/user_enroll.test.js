/**
 * Testing Script to test user enrollment
 *
 *  @author Sachu Shaji Abraham <sachu.shaji@netobjex.com>
 */

/* global describe,it,before */


require('mocha');
const { expect } = require('chai');

const axios = require('axios');

let Enrollment1; // variable to store response of user one
let Enrollment2; // variable to store response of user two
let Enrollment3; // variable to store response of user three
let channel; // channel creation
let ChannelJoin1; // Org1 channel join
let ChannelJoin2; // Org2 channel join
let ChannelJoin3; // Org3 channel join

before('Running pre configurations', async function enroll() {
  this.timeout(0);
  // Running Enrollment One
  await axios({
    method: 'post',
    url: ' http://localhost:4000/users',
    data: {
      username: 'Adam',
      orgName: 'Org1',
    },
  }).then((res) => {
    Enrollment1 = res;
  }).catch((err) => {
    Enrollment1 = err;
  });
  // Running Enrollment Two
  await axios({
    method: 'post',
    url: ' http://localhost:4000/users',
    data: {
      username: 'Max',
      orgName: 'Org2',
    },
  }).then((res) => {
    Enrollment2 = res;
  }).catch((err) => {
    Enrollment2 = err;
  });
  // Running Enrollment Three
  await axios({
    method: 'post',
    url: ' http://localhost:4000/users',
    data: {
      username: 'Kate',
      orgName: 'Org3',
    },
  }).then((res) => {
    Enrollment3 = res;
  }).catch((err) => {
    Enrollment3 = err;
  });
  // Requesting Channel Creation
  await axios({
    method: 'post',
    url: ' http://localhost:4000/channels',
    headers: { authorization: `Bearer ${Enrollment1.data.token}` },
    data: {
      channelName: 'rxmed',
      channelConfigPath: '../artifacts/channel/channel.tx',
    },
  }).then((res) => {
    channel = res;
  }).catch((err) => {
    channel = err;
  });
  // Request to join channel on Org1
  await axios({
    method: 'post',
    url: ' http://localhost:4000/channels/rxmed/peers',
    headers: { authorization: `Bearer ${Enrollment1.data.token}` },
    data: {
      peers: ['peer0.org1.rxmed.com', 'peer1.org1.rxmed.com', 'peer2.org1.rxmed.com', 'peer3.org1.rxmed.com'],
    },
  }).then((res) => {
    ChannelJoin1 = res;
  }).catch((err) => {
    ChannelJoin1 = err;
  });
  // Request to join channel on Org2
  await axios({
    method: 'post',
    url: ' http://localhost:4000/channels/rxmed/peers',
    headers: { authorization: `Bearer ${Enrollment2.data.token}` },
    data: {
      peers: ['peer0.org2.rxmed.com', 'peer1.org2.rxmed.com', 'peer2.org2.rxmed.com', 'peer3.org2.rxmed.com'],
    },
  }).then((res) => {
    ChannelJoin2 = res;
  }).catch((err) => {
    ChannelJoin2 = err;
  });
  // Request to join channel on Org3
  await axios({
    method: 'post',
    url: ' http://localhost:4000/channels/rxmed/peers',
    headers: { authorization: `Bearer ${Enrollment3.data.token}` },
    data: {
      peers: ['peer0.org3.rxmed.com', 'peer1.org3.rxmed.com', 'peer2.org3.rxmed.com', 'peer3.org3.rxmed.com'],
    },
  }).then((res) => {
    ChannelJoin3 = res;
  }).catch((err) => {
    ChannelJoin3 = err;
  });
});

describe('Testing the enrollment of the users', () => {
  it('it should succesfully register the users one ', () => {
    expect(Enrollment1)
      .to.have.property('status')
      .equals(200);
  });
  it('it should succesfully register the users two', () => {
    expect(Enrollment2)
      .to.have.property('status')
      .equals(200);
  });
  it('it should succesfully register the users three', () => {
    expect(Enrollment3)
      .to.have.property('status')
      .equals(200);
  });
});

describe('Creation of channels', () => {
  it('it should successfully create a channel', () => {
    expect(channel.data.success)
      .equals(true);
  });
});

describe('Joining into channels', () => {
  it('Org1 should succesfully join channel', () => {
    expect(ChannelJoin1.data.success)
      .equals(true);
  });
  it('Org2 should succesfully join channel', () => {
    expect(ChannelJoin2.data.success)
      .equals(true);
  });
  it('Org3 should succesfully join channel', () => {
    expect(ChannelJoin3.data.success)
      .equals(true);
  });
});
