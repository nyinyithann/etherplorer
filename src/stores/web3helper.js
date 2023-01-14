import web3 from './webthree';

export async function getBlockNumberByTimestamp(timestamp, currentBlockNumber) {
  let minBlockNumber = 0;
  let maxBlockNumber = currentBlockNumber;
  let closetBlockNumber = Math.floor((minBlockNumber + maxBlockNumber) / 2);
  let closetBlock = await web3.eth.getBlock(closetBlockNumber);
  let foundExactBlock = false;
  while (minBlockNumber <= maxBlockNumber) {
    if (closetBlock.timestamp === timestamp) {
      foundExactBlock = true;
      break;
    } else if (closetBlock.timestamp > timestamp) {
      maxBlockNumber = closetBlockNumber - 1;
    } else {
      minBlockNumber = closetBlockNumber + 1;
    }
    closetBlockNumber = Math.floor((minBlockNumber + maxBlockNumber) / 2);
    closetBlock = await web3.eth.getBlock(closetBlockNumber);
  }
  return closetBlockNumber;
}
