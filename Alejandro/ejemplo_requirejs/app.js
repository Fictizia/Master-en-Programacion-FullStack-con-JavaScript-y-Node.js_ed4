require.config({
    paths: {
      "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
      "team1":"scripts/team1",
      "team2":"scripts/team2"
    }
  });

require(['scripts/template',"scripts/main"], function(template,dom) {
    template.showName("Jack");
    dom.fill();
});