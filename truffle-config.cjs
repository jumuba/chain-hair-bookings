module.exports = {
  networks: {
    ganache: {
      host: "localhost",
      port: 7545,
      network_id: "*"
    }
  },

  compilers: {
    solc: {
      version: "0.4.26"
    }
  }
};