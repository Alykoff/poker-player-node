
var OUR_NAME = 'node';

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

    var card1 = player.hole_cards[0];
    var card2 = player.hole_cards[1];
    var rank1 = rank2Num(card1.rank);
    var rank2 = rank2Num(card2.rank);
    var bet = 0, min_raise = 0;

    if (game_state.current_buy_in > parseInt(game_state.small_blind) * 2) {
      if (game_state.current_buy_in >= parseInt(game_state.small_blind) * 6) {
        if ((rank1 > 11 && rank2 > 11) || (rank1 == rank2 && rank1 >= 10)) {
          bet = player.stack;
        }
      } else {
<<<<<<< HEAD
        if (rank1 + rank2 >= 17) {
=======
        if ((player.stack / game_state.small_blind > 50) || ((rank1 + rank2 >= 17) || (rank1 == rank2 && rank1 >=10 ))){
>>>>>>> a3dc225d036d47bc8106bf18a25299c2efe561f6
          bet = game_state.current_buy_in - player.bet;
        }
      }
    } else if ((rank1 + rank2 >= 17)) {
      bet = parseInt(game_state.small_blind) * 6;
    }

    return bet;
}

function flop_request(game_state) {
  var player = game_state.players[game_state.in_action],
      stack = player.stack,
      card1 = player.hole_cards[0],
      card2 = player.hole_cards[1],
      rank1 = rank2Num(card1.rank),
      rank2 = rank2Num(card2.rank),
      numOfPlayers = game_state.players.length,
      communityCards = game_state.community_cards;
  
  var allCards = [], i;
  var isPair=0, isTwoPair = 0, isThree = 0, isFour = 0, isFlash = 0;
  var arPairs = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0 
  };

  allCards.push(card1);
  arPairs[rank1] += 1;
  arPairs[rank2] += 1;
  
  allCards.push(card2);

  console.log('Stack in flop: ' + stack);

  for (var card in communityCards) {
    allCards.push(card);
    arPairs[rank2Num(card.rank)] += 1;
  }
    
  for (i in arPairs) {
    if(arPairs[i] == 4) {
      isFour = 1;
    } else if(arPairs[i] == 3) {
      isThree = 1;
    } else if(arPairs[i] == 2) {
      if( isPair >  0) {
        isTwoPair = 1;
      } else {
        isPair = 1;
      }
    }
  }
  
  if (isFour || isThree ) {
    return stack;
  }
  
  if ( isTwoPair || isPair ) {
    min_raise = game_state.current_buy_in - player.bet + game_state.minimum_raise;
    return min_raise;
  }

  return 0;
}

function turn_request(game_state) {
  var player = game_state.players[game_state.in_action],
      stack = player.stack,
      card1 = player.hole_cards[0],
      card2 = player.hole_cards[1],
      rank1 = rank2Num(card1.rank),
      rank2 = rank2Num(card2.rank),
      numOfPlayers = game_state.players.length,
      communityCards = game_state.community_cards;
  var allCards = [];
  allCards.push(card1);
  allCards.push(card2);
  for (var card in communityCards) {
      allCards.push(card);
  }
  
  console.log('Stack in turn: ' + stack);

  // var allRankCards = allCards.map(function(el) {
  //   return rank2Num(el.rank);
  // }).sort(function(a, b) {
  //   return a - b;
  // });

  // var isSt

  return flop_request(game_state);
}

function river_request(game_state) {
  var player = game_state.players[game_state.in_action],
      stack = player.stack,
      card1 = player.hole_cards[0],
      card2 = player.hole_cards[1],
      rank1 = rank2Num(card1.rank),
      rank2 = rank2Num(card2.rank),
      numOfPlayers = game_state.players.length,
      communityCards = game_state.community_cards;
  var allCards = [];
  allCards.push(card1);
  allCards.push(card2);
  for (var card in communityCards) {
      allCards.push(card);
  }

  return flop_request(game_state);
}




module.exports = {

  exception: false,
  show_log:true,
  VERSION: "Stage flop",

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
