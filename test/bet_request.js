var assert = require("assert");
var player = require("../player.js");

var game_state_simple = {
    "tournament_id": "55e4be2d4adaaf0003000002",
    "game_id": "5607a8e4e9958b0003000015",
    "round": 0,
    "players": [{
        "name": "Senior and Co",
        "stack": 0,
        "status": "out",
        "bet": 0,
        "version": "",
        "id": 0
    }, {
        "name": "node",
        "stack": 980,
        "status": "active",
        "bet": 20,
        "hole_cards": [{"rank": "8", "suit": "clubs"}, {"rank": "2", "suit": "diamonds"}],
        "version": "Preflop stage active",
        "id": 1
    }, {
        "name": "Fish",
        "stack": 800,
        "status": "active",
        "bet": 200,
        "version": "Default Ruby folding player",
        "id": 2
    }, {
        "name": "Abuse Or Lose",
        "stack": 0,
        "status": "active",
        "bet": 1000,
        "version": "0.1.0",
        "id": 3
    }, {
        "name": "inem",
        "stack": 1000,
        "status": "folded",
        "bet": 0,
        "version": "Default Ruby folding player",
        "id": 4
    }, {"name": "Mandarine", "stack": 0, "status": "out", "bet": 0, "version": "Default Ruby folding player", "id": 5}],
    "small_blind": 10,
    "orbits": 0,
    "dealer": 5,
    "community_cards": [],
    "current_buy_in": 1000,
    "pot": 1220,
    "in_action": 1,
    "minimum_raise": 800,
    "bet_index": 7
};

describe('player', function () {
    describe('bet_request', function () {
        it('syntax test', function () {
            var bet = player.bet_request(game_state_simple);
            assert(bet > 0);
        });
    });
});