
module.exports = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(game_state) {
    console.log("game_state !!!", game_state)
    return 1000;
  },

  showdown: function(game_state) {

  },

  get_player_cards: function(game_state) {
    var index = game_state.in_action;

    if (game_state.players[index]) {
      return game_state.players[index].hole_cards;
    }

    console.log("player not found", game_state);
  }

};
