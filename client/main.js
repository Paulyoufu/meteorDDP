


Template.leaderboard.players1 = function () {
  return Players.find({}, {sort: {score: -1, name: 1}});
};

Template.leaderboard.selected_name = function () {
  var player = Players.findOne(Session.get("selected_player"));
//  alert(player);
 // console.log(player && player.name)
 return player && player.name;
};

Template.player.selected = function () {
  return Session.equals("selected_player", this._id) ? "selected" : '';
};

Template.leaderboard.events({
  'click input.inc': function () {
    Players.update(Session.get("selected_player"), {$inc: {score: 5}});
  },
  'click #btnAdd':function(){
    Players.insert({name:'Lies',score:100});
  },
  'click #btnDel':function(){
    Players.remove(Session.get("selected_player"),{name:'lies'});
  },
  'click #btnSearch':function(){
    Template.leaderboard.search();
  },
});




Template.leaderboard.search = function()
{
 // var play = Players.find({name:"Lies"}, {sort: {score: -1, name: 1}});

  //str = JSON.stringify(player);
 var cursor = Players.find({name:"Lies"}, {sort: {score: -1, name: 1}});

 // return player && player.name;
  cursor.fetch();
 cursor.forEach(function(o){
     console.log(o.name);
     $("#divSearch").append("<p>"+o.name+"      "+o.score+"</p>")
 });
//$("#divSearch").append("<p>"+player.name+"      "+player.score+"</p>")


}


Template.player.events({
  'click': function () {
    Session.set("selected_player", this._id);
    //alert(this._id);
  }
});
