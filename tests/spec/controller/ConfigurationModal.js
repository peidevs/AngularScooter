describe('ConfigurationModal', function () {
    beforeEach(module('scooter'));

    var $controller;
    var $modalInstance;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('$scope.addPlayer', function () {
        var $scope;
        var controller;

        beforeEach(function(){
            $scope = {};
            controller = $controller( 'ConfigurationModal', {$scope: $scope});
        });

        it('Nothing entered by the user, the player is not added to the game', function () {
            $scope.playerToAdd = '';

            controller.addPlayer();
            expect($scope.players).toEqual('strong');
        });

        it('A user\'s name was entered. The player is added to the game', function(){

        } );

        it('Resets the playerToAdd box after adding the player', function(){

        });
    });
});