// tokenContext.js

const TokenContext = {
    token: null,
    
    setToken: function(token) {
      console.log(token);
      console.log(this.token);
      this.token = token;
    },

    getToken: function() {
      return this.token;
    }
  };

