
module.exports = {

  VERSION: "Preflop stage active",
  
  bet_request: function(game_state) {
    console.log("game_state !!!", game_state);
    var preflop = preflop_stage(game_state);
    if (preflop === false) {
      return 1000;
    }
    return preflop;
  },

  // rank2Num: function(rank) {
  //   switch (rank) {
  //     case 'J': return 11;
  //     case 'Q': return 12;
  //     case 'K': return 13;
  //     case 'A': return 14;
  //     default: return rank;
  //   }
  // },

  /**
   * @returns false - если не префлоп
   *      1000 - если пара или больше или равно 10
   *      0 - если нужно сбросить карты
   */
  preflop_stage: function(game_state) {
    var player = game_state.players[game_state.in_action];
    
    if ( game_state.community_cards && game_state.community_cards.length == 0 ) {
      return false;
    }
    
    if ( player.hole_cards.length != 2 ) {
      return false;
    }
    
    var card1 = player.hole_cards[0], card2 = player.hole_cards[1];
    
    if (
      card1.rank == card2.rank
    ) {
      return 1000;
    }
    
    if (
      (
        card1.rank == '10'
        || card1.rank == 'J'
        || card1.rank == 'Q'
        || card1.rank == 'K'
        || card1.rank == 'A'
      ) && (
        card2.rank == '10'
        || card2.rank == 'J'
        || card2.rank == 'Q'
        || card2.rank == 'K'
        || card2.rank == 'A'
      )
    ) {
      return 1000;
    }
    
    return 10;
  },
  
  showdown: function(game_state) {

  },

  should_bet_after_flop: function(cards) {
    return true;
  },

  get_player_cards: function(game_state) {
    var index = game_state.in_action;

    if (game_state.players[index]) {
      return game_state.players[index].hole_cards;
    }

    console.log("player not found", game_state);
  }

};
