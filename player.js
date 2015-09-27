
function rank2Num(rank) {
  switch (rank) {
    case 'J': return 11;
    case 'Q': return 12;
    case 'K': return 13;
    case 'A': return 14;
    default: return parseInt(rank);
  }
}
/**
 * @returns false - если не префлоп
 *      1000 - если пара или больше или равно 10
 *      0 - если нужно сбросить карты
 */
function preflop_stage(game_state) {
  var player = game_state.players[game_state.in_action];

  if ( player.hole_cards.length != 2 ) {
    return false;
  }
  
  var card1 = player.hole_cards[0], card2 = player.hole_cards[1];
  
  if (
    card1.rank == card2.rank
  ) {
    return 1000;
  }
  
  var numCard1 = rank2Num(card1);
  var numCard2 = rank2Num(card2);
  if (numCard1 >= 10 && numCard2 >= 10) {
    return 1000;
  }
  
  return 10;
}

function flop_request(game_state) {
  return 1000;
}

function turn_request(game_state) {
  return 1000;
}

function river_request(game_state) {
  return 1000;
}




module.exports = {

  VERSION: "Preflop stage active",  
  
  bet_request: function(game_state) {
    console.log('game_state_json', JSON.stringify(game_state));
    console.log("game_state !!!", game_state);

    var player = game_state.players[game_state.in_action];
    if ( player.hole_cards.length != 2 ) {
      return false;
    }
    var bet=0;

    
    if ( game_state.community_cards && game_state.community_cards.length == 0 ) {
      bet = preflop_stage(game_state);
    } else if ( game_state.community_cards && game_state.community_cards.length == 3 ) {
      bet = flop_request(game_state);
    } else if ( game_state.community_cards && game_state.community_cards.length == 4 ) {
      bet = turn_request(game_state);
    } else if ( game_state.community_cards && game_state.community_cards.length == 5 ) {
      bet = river_request(game_state);
    } else {
      return 0;
    }
    
    return bet;
  },
  
  showdown: function(game_state) {

  },

  should_bet_after_flop: function(cards) {

    return true;
  },

  any_cards_are_equal: function(cards) {
    for (var i = 0; i < cards.length-1; i++) {
      for (var j = i+1; j < cards.length; j++) {
        if (cards[i].rank == cards[j].rank)
          return true;
      }
    }
    return false;
  },

  get_player_cards: function(game_state) {
    var index = game_state.in_action;

    if (game_state.players[index]) {
      return game_state.players[index].hole_cards;
    }

    console.log("player not found", game_state);
  }

};
