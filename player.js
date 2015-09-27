
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

    var bet = 0;

    min_raise = game_state.current_buy_in - player.bet + game_state.minimum_raise;
    if ( rank2Num(card1.rank) >= 10 ) {
      bet += min_raise > 500 ? min_raise : 500;
    }

    if ( rank2Num(card2.rank) >= 10 ) {
      bet += min_raise > 500 ? min_raise : 500;
    }

    return bet;
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

  exception: false,
  show_log:true,
  VERSION: "Stage preflop, 2 strategy",

  log: function () {
      if (this.show_log) {
          console.log(arguments);
      }
  },

  bet_request: function(game_state) {
    try {
      this.log('game_state_json', JSON.stringify(game_state));

      var player = game_state.players[game_state.in_action];
      if ( player.hole_cards.length != 2 ) {
        return false;
      }
      var bet = 0;

      if ( game_state.community_cards ) {
        var tableState = game_state.community_cards.length;

        if ( tableState == 0 ) {
          bet = preflop_stage(game_state);
        } else if ( tableState == 3 ) {
          bet = flop_request(game_state);
        } else if ( tableState == 4 ) {
          bet = turn_request(game_state);
        } else if ( tableState == 5 ) {
          bet = river_request(game_state);
        } else {
          return 0;
        }
      }
      return bet;
    } catch (e) {
      this.exception = true;
      console.log(e);
      console.log('EXCEPTION!' + e.name + ":" + e.message + "\n" + e.stack);
      return 1000;
    }
  },

  showdown: function(game_state) {

  },

};
