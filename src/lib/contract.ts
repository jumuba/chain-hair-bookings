// 👉 PASTE YOUR DEPLOYED CONTRACT ADDRESS FROM GANACHE HERE
// Run `truffle migrate` and copy the address shown after "contract address:"
export const CONTRACT_ADDRESS = "0x39e440B2a7f24a0FC2BA3F9951e9399C563eA6C2";

// ABI for BookingContract — bookSlot(string uname, uint _day, uint _fromTime, uint _toTime) payable
export const CONTRACT_ABI: any[] = [
  {
    "constant": false,
    "inputs": [
      { "internalType": "string", "name": "uname", "type": "string" },
      { "internalType": "uint256", "name": "_day", "type": "uint256" },
      { "internalType": "uint256", "name": "_fromTime", "type": "uint256" },
      { "internalType": "uint256", "name": "_toTime", "type": "uint256" }
    ],
    "name": "bookSlot",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }
];

// Price sent with the booking (in ETH).
export const BOOKING_PRICE_ETH = "0.01";