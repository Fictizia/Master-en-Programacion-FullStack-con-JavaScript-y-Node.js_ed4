define(["team1","team2"],function (team1,team2) {

    var rellenar = function(){
        document.body.innerHTML += "<h4>Hyderabad Team: </h4>" + "<br>" + " Team:"+team1.team +"<br>"+"Captain:" +team1.captain +"<br>";
        
        document.body.innerHTML += "<h4>Bangalore Team: </h4>" + "<br>" + " Team:"+team2.team +"<br>"+"Captain:"+team2.captain +"<br>";   
    }
    return {
        fill : rellenar
      };
 });