window.onload = init;
var controller;

function init() {
    // init controller
    // we only do this one time
    controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave',
            duration: "200%",
            reverse: true
        },
        vertical: false
    });

    // get all slides
    var slides = document.querySelectorAll("section.panel");

    // create scene for every slide
    for (var i = 0; i < slides.length; i++) {
        new ScrollMagic.Scene({
                triggerElement: slides[i]
            })
            .setPin(slides[i], {
                pushFollowers: false
            })
    };
};

///////// https://greensock.com/forums/topic/17564-scrollmagic-horizontal-scroll-with-anchor-navigation/
/////// https://codepen.io/biomagic/pen/dLgzJO
//// https://scrollmagic.io/examples/basic/going_horizontal.html
