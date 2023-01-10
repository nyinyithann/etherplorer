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

export const toBlock = (result) => {
  const blocks = result.map((x) => ({
    ...x,
    // baseFeePerGas: web3.utils.hexToNumber(x.baseFeePerGas),
    // number: web3.utils.hexToNumber(x.number),
    // difficulty: web3.utils.hexToNumber(x.difficulty),
    // totalDifficulty: web3.utils.hexToNumber(x.totalDifficulty),
    // gasLimit: web3.utils.hexToNumber(x.gasLimit),
    // gasUsed: web3.utils.hexToNumber(x.gasUsed),
    // size: web3.utils.hexToNumber(x.size),
    // timestamp: web3.utils.hexToNumber(x.timestamp),
    date: toDate(x.timestamp * 1000),
    age: getDiff(x.timestamp * 1000, moment()),
    txnCount:
      x.transactions && Array.isArray(x.transactions)
        ? x.transactions.length
        : 0,
  }));
  blocks.sort((a, b) => b.timestamp - a.timestamp);
  return blocks;
};
