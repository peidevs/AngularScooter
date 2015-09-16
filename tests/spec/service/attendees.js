describe("attendees", function () {
    var attendees;
    var httpBackend;
    var users = [{name: 'foo'}, {name: 'bar'}];

    var isAnyPlayerAWinner = function (players) {
        return players.some(function (player) {
            return player.isWinner;
        });
    };

    var isAnyPlayerAlive = function (players) {
        return players.some(function (player) {
            return player.isAlive;
        });
    };

    var areAllPlayersAlive = function (players) {
        return players.every(function (player) {
            return player.isAlive;
        })
    };


    beforeEach(module('scooter'));

    beforeEach(inject(function ($injector) {
        attendees = $injector.get('attendees');
        httpBackend = $injector.get('$httpBackend');
    }));

    beforeEach(function () {
        httpBackend.when('GET', 'attendees.json').respond(users);
    });

    describe("get()", function () {

        it("returns a list of attendees that are all alive", function () {
            httpBackend.flush();

            var players = attendees.get();
            var names = players.map(function (player) {
                return player.name;
            });

            expect(players.length).toBe(2);
            expect(names).toContain(users[0].name);
            expect(names).toContain(users[1].name);
            expect(areAllPlayersAlive(players)).toBeTruthy();
        });
    });

    describe("reset()", function () {

        it("sets all policies back to alive", function () {
            httpBackend.flush();
            var players = attendees.get();

            players[0].isAlive = false;

            attendees.reset();

            expect(areAllPlayersAlive(players)).toBeTruthy();
        });

        it("There are no winners after a reset", function () {
            httpBackend.flush();
            spyOn(Math, 'random').and.returnValue(0.1);

            var players = attendees.get();

            attendees.play(); //2 players, one is forced dead because of mock random

            attendees.reset();

            expect(areAllPlayersAlive(players)).toBeTruthy();
            expect(isAnyPlayerAWinner(players)).toBeFalsy();
        });
    });

    describe("update()", function () {
        /* To Simple to test */
    });

    describe("play()", function () {

        beforeEach(function () {
            httpBackend.flush();
            spyOn(Math, 'random').and.returnValue(0.1);
        });

        it("A player can lose in a round", function () {

            attendees.play();
            var players = attendees.get();

            expect(areAllPlayersAlive(players)).toBeFalsy();
        });

        it("When there is only one player left, they are the winner", function () {

            attendees.play();
            var players = attendees.get();

            expect(isAnyPlayerAWinner(players)).toBeTruthy();
        });

        it("When a player wins, they can not lose", function () {
            //play a bunch to simulate trying to kill every player
            attendees.play();
            attendees.play();
            attendees.play();
            attendees.play();

            var players = attendees.get();

            expect(isAnyPlayerAlive(players)).toBeTruthy();
            expect(isAnyPlayerAWinner(players)).toBeTruthy();
        });

    });
});