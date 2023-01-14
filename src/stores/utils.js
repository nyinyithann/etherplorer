import moment from 'moment';

import web3 from './webthree';

const toDate = (timestamp) => {
  const d = new Date(timestamp);
  return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}/  ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} `;
};

const getDiff = (timestamp, now) => {
  const a = now;
  const b = moment(timestamp);
  let result = '';

  const years = a.diff(b, 'year');
  b.add(years, 'years');
  if (years) {
    result = `${years} ${years > 1 ? 'years' : 'year'}`;
  }

  const months = a.diff(b, 'months');
  b.add(months, 'months');
  if (months) {
    result = `${result} ${months} ${months > 1 ? 'months' : 'month'}`;
  }

  const days = a.diff(b, 'days');
  b.add(days, 'days');
  if (days) {
    result = `${result} ${days} ${days > 1 ? 'days' : 'day'}`;
  }

  const hours = a.diff(b, 'hours');
  b.add(hours, 'hours');
  if (hours) {
    result = `${result} ${hours} ${hours > 1 ? 'hours' : 'hour'}`;
  }

  const minutes = a.diff(b, 'minutes');
  b.add(minutes, 'minutes');
  if (minutes) {
    result = `${result} ${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`;
  }

  const seconds = a.diff(b, 'seconds');

  return `${result} ${seconds} ${seconds > 1 ? 'seconds' : 'second'}`;
};

export const toBlock = (b) => ({
  ...b,
  date: toDate(b.timestamp * 1000),
  age: getDiff(b.timestamp * 1000, moment()),
  baseFeePerGas: b.baseFeePerGas
    ? web3.utils.fromWei(b.baseFeePerGas.toString(), 'ether')
    : '',
  txnCount:
    b.transactions && Array.isArray(b.transactions) ? b.transactions.length : 0,
});

export const toBlocks = (result) => {
  const blocks = result.map(toBlock);
  blocks.sort((a, b) => b.timestamp - a.timestamp);
  return blocks;
};

export const toTxns = (result, blocks) => {
  const txns = result.map((x) => ({
    ...x,
    age: blocks.find((b) => b.number === x.blockNumber)?.age,
    value: web3.utils.fromWei(x.value, 'ether'),
    gasPrice: web3.utils.fromWei(x.gasPrice, 'ether'),
  }));
  txns.sort((a, b) => b.blockNumber - a.blockNumber);
  return txns;
};

export const toTxn = (t, block) => ({
  ...t,
  age: getDiff(block.timestamp * 1000, moment()),
  date: toDate(block.timestamp * 1000),
  value: web3.utils.fromWei(t.value, 'ether'),
  gasPrice: web3.utils.fromWei(t.gasPrice, 'ether'),
});
