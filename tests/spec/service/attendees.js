describe("attendees", function () {
    var attendees;
    var httpBackend;
    var users = [{name: 'foo'}, {name: 'bar'}];

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

            var actual = attendees.get();
            var names = actual.map(function (attendee) {
                return attendee.name;
            });

            var areAllPlayersAlive = actual.every(function (attendee) {
                return attendee.isAlive;
            });

            expect(actual.length).toBe(2);
            expect(names).toContain(users[0].name);
            expect(names).toContain(users[1].name);
            expect(areAllPlayersAlive).toBeTruthy();
        });
    });

    describe("reset()", function () {

        it("sets all policies back to alive", function () {
            httpBackend.flush();
            var actual = attendees.get();

            actual[0].isAlive = false;

            attendees.reset();

            var areAllPlayersAlive = actual.every(function (attendee) {
                return attendee.isAlive;
            });

            expect(areAllPlayersAlive).toBeTruthy();
        });
    });

    describe("update()", function () {
        /* To Simple to test */
    });

    describe("play()", function () {

        beforeEach( function(){
            httpBackend.flush();
            spyOn(Math, 'random').and.returnValue(0.1);
        });

        it("A player can lose in a round", function () {

            attendees.play();
            var actual = attendees.get();

            var isAnyPlayerDead = actual.some(function (attendee) {
                return !attendee.isAlive;
            });

            expect(isAnyPlayerDead).toBeTruthy();
        });

        it( "When there is only one player left, they are the winner", function(){

            attendees.play();
            var actual = attendees.get();

            var isAnyPlayerAWinner = actual.some(function (attendee) {
                return attendee.isWinner;
            });

            expect(isAnyPlayerAWinner).toBeTruthy();
        });

        it( "When a player wins, they can not lose", function(){
            //play a bunch to simulate trying to kill every player
            attendees.play();
            attendees.play();
            attendees.play();
            attendees.play();

            var actual = attendees.get();

            var areAnyPlayersAlive = actual.some(function (attendee) {
                return attendee.isAlive;
            });

            var isAnyPlayerAWinner = actual.some(function (attendee) {
                return attendee.isWinner;
            });

            expect(areAnyPlayersAlive).toBeTruthy();
            expect(isAnyPlayerAWinner).toBeTruthy();
        });

    });
});