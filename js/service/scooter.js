scooter.service( 'scooter', function(){

    var numChances = 4;

    var getRandom = function (min, max) {
        var x = Math.floor(Math.random() * (max - min + 1)) + min;
        return x;
    };

    var oneInNChance = function (numChances) {
        return ( getRandom(1, numChances) === 1 );
    };

    return {
        isLoserThisRound : function(){
            return oneInNChance( numChances );
        }
    }
});