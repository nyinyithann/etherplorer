import Web3 from 'web3';
// const apiPath = `https://mainnet.infura.io/v3/${process.env.NEXT_INFURA_API_KEY}`;
const apiPath = `https://goerli.infura.io/v3/${process.env.NEXT_INFURA_API_KEY}`;
const web3 = new Web3(apiPath);
export default web3;
