/*!
 * kombat-tower.js
 *
 * MIT licensed
 * Copyright (C) 2015 Julius Medrano, https://github.com/IWillScoop/kombat-tower.js
 */

/*********************************************
 * kombat-tower.js
 *********************************************/

var Kombat = (function() {

    'use strict';

    // Elements
    var body = null;

    // Scroll vars
    var animation = null;
    var startTime = null;
    var startPosition = null;

    var mainAudio;
    var endAudio;

    var descending = false;

    /**
     * Utils
     */

    // Soft object augmentation
    function extend( target, source ) {
        for ( var key in source ) {
            if ( !( key in target ) ) {
                target[ key ] = source[ key ];
            }
        }
        return target;
    };

    /**
     * Main
     */

    // Time is passed through requestAnimationFrame, what a world!
    function animateLoop( time ) {
        if (!startTime) {
            startTime = time;
            setTimeout(function(){}, 2000);
        }
        var speed = 5;
        var oldPosition = window.pageYOffset
        var easedPosition = window.pageYOffset + speed;
        window.scrollTo(0, easedPosition);
        if( (window.pageYOffset - oldPosition) !== 0) {
            animation = requestAnimationFrame(animateLoop);
        } else {
            animationFinished();
        }
   };

    function descend() {

        if( descending ) {
            return;
        }

        descend = true;
        startPosition = 0;
        

        // Start music!
        if( mainAudio ) {
            mainAudio.play();
        }
        setTimeout(function(){requestAnimationFrame( animateLoop );}, 2000);

    }

    function resetPositions() {
        startTime = null;
        startPosition = null;
        descending = false;
    }

    function animationFinished() {
        
        resetPositions();

        // Stop music!
        if( mainAudio ) {
            mainAudio.pause();
            mainAudio.currentTime = 0;
        }

        if( endAudio ) {
            endAudio.play();
        }
    }

    function onWindowBlur() {

        // If animating, go straight to the top. And play no more music.
        if( descending ) {

            cancelAnimationFrame( animation );
            resetPositions();

            if( mainAudio ) {
                mainAudio.pause();
                mainAudio.currentTime = 0;
            }

            window.scrollTo(0, (document.documentElement.clientHeight || document.body.clientHeight));
        }
    }

    //@TODO: Does this need tap bindings too?
    function bindDescendingToElement( element ) {
        element.addEventListener('click', descend, false);
    }

    function main( options ) {

        // Bind to element click event, if need be.
        body = document.body;

        if( options.element ) {
            bindDescendingToElement( options.element );
        }

        if( options.mainAudio ) {
            mainAudio = new Audio( options.mainAudio );
            mainAudio.setAttribute( 'preload', 'true' ); //@TODO: Option to not preload audio.
            mainAudio.setAttribute( 'loop', 'true' );
        }

        if( options.endAudio ) {
            endAudio = new Audio( options.endAudio );
            endAudio.setAttribute( 'preload', 'true' );
        }

        window.addEventListener('blur', onWindowBlur, false);
    }

    return extend(main, {
        descend: descend
    });
})();
