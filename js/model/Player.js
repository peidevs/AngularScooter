'use strict'
function Player( name, photo_link ){
    this.name = name;
    this.photo_link = photo_link || "http://img2.meetupstatic.com/img/458386242735519287330/noPhoto_50.png";
    this.isAlive = true;
    this.isWinner = false;
};
