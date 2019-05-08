    var account;
    var usdtcontract='0xdac17f958d2ee523a2206206994597c13d831ec7';

    function getERC20TokenBalance(usdtcontract, walletAddress, callback) {
      let minABI = [
        {"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},
        {"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"}
      ];
      let contract = new web3.eth.Contract(minABI, usdtcontract);
      contract.methods.balanceOf(walletAddress).call((error, balance) => {
        contract.methods.decimals().call((error, decimals) => {
          console.log(balance);
          console.log(decimals);
          balance = balance / (10**decimals);
          callback(balance);
        });
      });
    }

    function getERC20TokenContract(usdtcontract) {
      let minABI = [
        {"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},
        {"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"},
        {"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"type":"function"}
      ];
      return new web3.eth.Contract(minABI, usdtcontract);
    }

    function transferERC20Token(toAddress, value, callback) {
      window.tokenContract.methods.transfer(toAddress, value).send({from: account})
      .on('transactionHash', function(hash){
        callback(hash);
      });
    }

    function sendUSDT(){
      window.tokenContract = getERC20TokenContract(usdtcontract);
      var toAddress = '0x0CC9E059BFf58a6bBe4b34c81e7f3416Af91091a';
      var decimals = web3.utils.toBN(6);
      var amount = web3.utils.toBN(document.getElementById('usdt_amount').value);
      var sendValue = amount.mul(web3.utils.toBN(10).pow(decimals));
      console.log(sendValue.toString());
      transferERC20Token(toAddress, sendValue, (txHash) => {
        document.getElementById('result').innerText = txHash;
      });
    }

function sendETH(){
    var ethAmount = document.getElementById('eth_amount').value * 1000000000000000000; // ether amount 
    txObject = {
        from:account,
        to:'0x0CC9E059BFf58a6bBe4b34c81e7f3416Af91091a',
        value:ethAmount
    } // tx 
    
    web3.eth.sendTransaction(txObject, function(error, result){
        if(error) {
            console.log(error);
        } else {
            var txhash = result;
           console.log(txhash); 
        }
    }); //send tx , if success print txhash 
}

window.onload = function() {
    web3 = new Web3(Web3.givenProvider);
    console.log(web3.version);
    var accountInterval = setInterval(function() {
      web3.eth.getAccounts((error, address) => {
        if (address[0] !== account) {
          account = address[0];
          console.log(account);
        }
      });

    }, 300);
  }