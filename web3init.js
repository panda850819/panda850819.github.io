window.onload = function() {
    web3 = new Web3(Web3.givenProvider);
    console.log(web3.version);

    web3.eth.net.getId(function (err, result) {
        var network = result;
        console.log(network);
        if(network != 1){
            alert('請切換為主網');
        }
    });

    var accountInterval = setInterval(function() {
      web3.eth.getAccounts((error, address) => {
        if (address[0] !== account) {
          account = address[0];
          console.log(account);
        }
      });

    }, 300);
  }
