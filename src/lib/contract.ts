// 👉 PASTE YOUR DEPLOYED CONTRACT ADDRESS FROM GANACHE HERE
export const CONTRACT_ADDRESS = "0xYourContractAddressHere";

// 👉 PASTE YOUR CONTRACT ABI (JSON array) HERE
// You can find it in your Truffle/Hardhat build folder (e.g. build/contracts/BookingContract.json -> "abi" field)
export const CONTRACT_ABI: any[] = [
  // Example shape — replace with your real ABI:
  // {
  //   "inputs": [
  //     { "internalType": "string", "name": "service", "type": "string" },
  //     { "internalType": "string", "name": "date", "type": "string" },
  //     { "internalType": "string", "name": "time", "type": "string" }
  //   ],
  //   "name": "bookSlot",
  //   "outputs": [],
  //   "stateMutability": "payable",
  //   "type": "function"
  // }
];

// Price sent with the booking (in ETH). Adjust to match your contract.
export const BOOKING_PRICE_ETH = "0.01";