define(['jquery'], function() {

    var showName = function(n) {
      var temp = "Hello "+n;
      $("body").append(temp);
    };
    return {
      showName: showName
    };
  });