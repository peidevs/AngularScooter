describe('Player', function () {

    it('A new player has a name', function () {
        var sut = new Player('foo');
        expect(sut.name).toBe('foo');
    });

    it('A new player is alive', function () {
        var sut = new Player();
        expect(sut.isAlive).toBeTruthy();
    });

    it('A new player is not the winner', function () {
        var sut = new Player();
        expect(sut.isWinner).toBeFalsy();
    });
});