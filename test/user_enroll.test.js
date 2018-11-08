/**
 * Testing Script to test user enrollment
 *
 *  @author Sachu Shaji Abraham
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
let UpdateAnchorPeer1;
let UpdateAnchorPeer2;
let UpdateAnchorPeer3;
let ChainCodeInstallorg1;
let ChainCodeInstallorg2;
let ChainCodeInstallorg3;
let InstatiateCode;
let TXID;
let QueryChainCode;
let QueryBlock;
// let QueryTXID;
let QueryChainInfo;
let QueryInstalledChaincodes;
let QueryintantiatedChainCodes;
let QueryChannels;

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
  // Request to update anchor peer 1
  await axios({
    method: 'post',
    url: ' http://localhost:4000/channels/rxmed/anchorpeers',
    headers: { authorization: `Bearer ${Enrollment1.data.token}` },
    data: {
      configUpdatePath: '../artifacts/channel/Org1MSPanchors.tx',
    },
  }).then((res) => {
    UpdateAnchorPeer1 = res;
  }).catch((err) => {
    UpdateAnchorPeer1 = err;
  });
  // Request to update anchor peer 2
  await axios({
    method: 'post',
    url: ' http://localhost:4000/channels/rxmed/anchorpeers',
    headers: { authorization: `Bearer ${Enrollment2.data.token}` },
    data: {
      configUpdatePath: '../artifacts/channel/Org2MSPanchors.tx',
    },
  }).then((res) => {
    UpdateAnchorPeer2 = res;
  }).catch((err) => {
    UpdateAnchorPeer2 = err;
  });
  // Request to update anchor peer 3
  await axios({
    method: 'post',
    url: ' http://localhost:4000/channels/rxmed/anchorpeers',
    headers: { authorization: `Bearer ${Enrollment3.data.token}` },
    data: {
      configUpdatePath: '../artifacts/channel/Org3MSPanchors.tx',
    },
  }).then((res) => {
    UpdateAnchorPeer3 = res;
  }).catch((err) => {
    UpdateAnchorPeer3 = err;
  });
  // Request to install Chaincode in Org1
  await axios({
    method: 'post',
    url: ' http://localhost:4000/chaincodes',
    headers: { authorization: `Bearer ${Enrollment1.data.token}` },
    data: {
      peers: ['peer0.org1.rxmed.com', 'peer1.org1.rxmed.com', 'peer2.org1.rxmed.com', 'peer3.org1.rxmed.com'],
      chaincodeName: 'mycc',
      chaincodePath: 'github.com/example_cc/go',
      chaincodeType: 'golang',
      chaincodeVersion: 'v0',
    },
  }).then((res) => {
    ChainCodeInstallorg1 = res;
  }).catch((err) => {
    ChainCodeInstallorg1 = err;
  });
  // Request to install Chaincode in Org2
  await axios({
    method: 'post',
    url: ' http://localhost:4000/chaincodes',
    headers: { authorization: `Bearer ${Enrollment2.data.token}` },
    data: {
      peers: ['peer0.org2.rxmed.com', 'peer1.org2.rxmed.com', 'peer2.org2.rxmed.com', 'peer3.org2.rxmed.com'],
      chaincodeName: 'mycc',
      chaincodePath: 'github.com/example_cc/go',
      chaincodeType: 'golang',
      chaincodeVersion: 'v0',
    },
  }).then((res) => {
    ChainCodeInstallorg2 = res;
  }).catch((err) => {
    ChainCodeInstallorg2 = err;
  });
  // Request to install Chaincode in Org3
  await axios({
    method: 'post',
    url: ' http://localhost:4000/chaincodes',
    headers: { authorization: `Bearer ${Enrollment3.data.token}` },
    data: {
      peers: ['peer0.org3.rxmed.com', 'peer1.org3.rxmed.com', 'peer2.org3.rxmed.com', 'peer3.org3.rxmed.com'],
      chaincodeName: 'mycc',
      chaincodePath: 'github.com/example_cc/go',
      chaincodeType: 'golang',
      chaincodeVersion: 'v0',
    },
  }).then((res) => {
    ChainCodeInstallorg3 = res;
  }).catch((err) => {
    ChainCodeInstallorg3 = err;
  });
  // Request to instantiate chaincode on Org1
  await axios({
    method: 'post',
    url: ' http://localhost:4000/channels/rxmed/chaincodes',
    headers: { authorization: `Bearer ${Enrollment1.data.token}` },
    data: {
      chaincodeName: 'mycc',
      chaincodeVersion: 'v0',
      chaincodeType: 'golang',
      args: ['a', '100', 'b', '200'],
    },
  }).then((res) => {
    InstatiateCode = res;
  }).catch((err) => {
    InstatiateCode = err;
  });
  // Request to invoke chaincode on peers of Org1 and Org2 and Org3
  await axios({
    method: 'post',
    url: ' http://localhost:4000/channels/rxmed/chaincodes/mycc',
    headers: { authorization: `Bearer ${Enrollment1.data.token}` },
    data: {
      peers: ['peer0.org1.rxmed.com', 'peer0.org2.rxmed.com', 'peer0.org3.rxmed.com'],
      fcn: 'move',
      args: ['a', 'b', '10'],
    },
  }).then((res) => {
    TXID = res;
  }).catch((err) => {
    TXID = err;
  });
  // Request to query chaincode on peer1 of Org1
  await axios({
    method: 'get',
    url: ' http://localhost:4000/channels/rxmed/chaincodes/mycc?peer=peer0.org1.rxmed.com&fcn=query&args=%5B%22a%22%5D',
    headers: { authorization: `Bearer ${Enrollment1.data.token}` },
  }).then((res) => {
    QueryChainCode = res;
  }).catch((err) => {
    QueryChainCode = err;
  });
  // Request to query Block by blockNumber
  await axios({
    method: 'get',
    url: ' http://localhost:4000/channels/rxmed/blocks/1?peer=peer0.org1.rxmed.com',
    headers: { authorization: `Bearer ${Enrollment1.data.token}` },
  }).then((res) => {
    QueryBlock = res;
  }).catch((err) => {
    QueryBlock = err;
  });
  // Request to query Transaction by TXID
  // await axios({
  //   method: 'get',
  //   url: `http://localhost:4000/channels/rxmed/transactions/${}?peer=peer0.org1.rxmed.com`,
  //   headers: { authorization: `Bearer ${Enrollment1.data.token}` },
  // }).then((res) => {
  //   QueryTXID = res;
  // }).catch((err) => {
  //   QueryTXID = err;
  // });
  // Request to query ChainInfo
  await axios({
    method: 'get',
    url: ' http://localhost:4000/channels/rxmed?peer=peer0.org1.rxmed.com',
    headers: { authorization: `Bearer ${Enrollment1.data.token}` },
  }).then((res) => {
    QueryChainInfo = res;
  }).catch((err) => {
    QueryChainInfo = err;
  });
  // Request to query installed Chaincodes
  await axios({
    method: 'get',
    url: ' http://localhost:4000/chaincodes?peer=peer0.org1.rxmed.com',
    headers: { authorization: `Bearer ${Enrollment1.data.token}` },
  }).then((res) => {
    QueryInstalledChaincodes = res;
  }).catch((err) => {
    QueryInstalledChaincodes = err;
  });
  // Request to query Instantiated chaincodes
  await axios({
    method: 'get',
    url: ' http://localhost:4000/channels/rxmed/chaincodes?peer=peer0.org1.rxmed.com',
    headers: { authorization: `Bearer ${Enrollment1.data.token}` },
  }).then((res) => {
    QueryintantiatedChainCodes = res;
  }).catch((err) => {
    QueryintantiatedChainCodes = err;
  });
  // Request to query Channels
  await axios({
    method: 'get',
    url: ' http://localhost:4000/channels?peer=peer0.org1.rxmed.com',
    headers: { authorization: `Bearer ${Enrollment1.data.token}` },
  }).then((res) => {
    QueryChannels = res;
  }).catch((err) => {
    QueryChannels = err;
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

describe('updating the anchor peers', () => {
  it('Org1 should succesfully update the its anchorpeer', () => {
    expect(UpdateAnchorPeer1.data.success)
      .equals(true);
  });
  it('Org2 should succesfully update the its anchorpeer', () => {
    expect(UpdateAnchorPeer2.data.success)
      .equals(true);
  });
  it('Org3 should succesfully update the its anchorpeer', () => {
    expect(UpdateAnchorPeer3.data.success)
      .equals(true);
  });
});

describe('Installing chaincodes in organisations', () => {
  it('Org1 should succesfully install the chain code', () => {
    expect(ChainCodeInstallorg1.data.success)
      .equals(true);
  });
  it('Org2 should succesfully install the chain code', () => {
    expect(ChainCodeInstallorg2.data.success)
      .equals(true);
  });
  it('Org3 should succesfully install the chain code', () => {
    expect(ChainCodeInstallorg3.data.success)
      .equals(true);
  });
});

describe('Instantiate chaincode on Org1', () => {
  it('Org1 should succesfully instantiate chaincode', () => {
    expect(InstatiateCode.data.success)
      .equals(true);
  });
});

// describe('Invoke chaincode on peers of Org1 and Org2 and Org3', () => {
//   it('It should succesfully invoke chaincode', () => {
//     console.log("this="+TXID);
//     expect(TXID.data.success)
//       .equals(true);
//   });
// });

describe('Query chaincode on peer1 of Org1', () => {
  it('Org1 should succesfully query chaincode on peer1', () => {
    expect(QueryChainCode.data.success)
      .equals(true);
  });
});

describe('Query Block by blockNumber', () => {
  it('It should successfully query Block by blockNumber', () => {
    expect(QueryBlock.data.success)
      .equals(true);
  });
});

// describe('Query Transaction by TXID', () => {
//   it('It should successfully query Transaction by TXID', () => {
//     expect(QueryTXID.data.success)
//       .equals(true);
//   });
// });

describe('Query ChainInfo', () => {
  it('It should successfully query ChainInfo', () => {
    expect(QueryChainInfo.data.success)
      .equals(true);
  });
});

describe('Query Installed chaincodes', () => {
  it('It should successfully query Installed chaincodes', () => {
    expect(QueryInstalledChaincodes.data.success)
      .equals(true);
  });
});

describe('Query  Instantiated chaincodes', () => {
  it('It should successfully query  Instantiated chaincodes', () => {
    expect(QueryintantiatedChainCodes.data.success)
      .equals(true);
  });
});


describe('Query query Channels', () => {
  it('It should successfully query Channels', () => {
    expect(QueryChannels.data.success)
      .equals(true);
  });
});
