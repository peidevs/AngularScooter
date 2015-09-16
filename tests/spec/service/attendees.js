describe( "attendees", function(){
    var attendees;
    var httpBackend;
    var users = [{ name: 'foo'}, {name: 'bar'}];

    beforeEach( module('scooter'));

    beforeEach( inject( function( $injector ){
        attendees = $injector.get( 'attendees' );
        httpBackend = $injector.get('$httpBackend');
    }));

    beforeEach( function(){
       httpBackend.when( 'GET', 'attendees.json').respond(users);
    });

    describe("get()", function(){

        it("returns a list of attendees", function(){
            httpBackend.flush();

            var actual = attendees.get();
            expect( actual).toBeTruthy();
            expect( actual.length ).toBe(2);
            expect( actual[0].name).toBe(users[0].name);
            expect( actual[1].name).toBe(users[1].name);
        });
    });

    describe("reset()", function(){

        it("sets all policies back to alive", function(){

        });
    });
});