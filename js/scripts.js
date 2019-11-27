window.onload = init;

function init() {
    // init controller
    // we only do this one time
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            duration: $('section').height(),
            triggerHook: .025,
            reverse: true
        },
        vertical: false
    });
    ////////////////////////////////////////// code from user Sahil of greeksock forums.
    ////////////////////////////////////////// https://greensock.com/profile/34555-sahil/
    ///////// https://greensock.com/forums/topic/17564-scrollmagic-horizontal-scroll-with-anchor-navigation/
    /////// https://codepen.io/biomagic/pen/dLgzJO
    //// https://scrollmagic.io/examples/basic/going_horizontal.html
    // Init controller
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            duration: $('section').height(),
            triggerHook: .025,
            reverse: true
        },
        vertical: false
    });


    /*
    object to hold href values of links inside our nav with
    the class '.anchor-nav'

    scene_object = {
      '[scene-name]' : {
        '[target-scene-id]' : '[anchor-href-value]'
      }
    }
    */
    var scenes = {
        'intro': {
            'intro': 'intro-anchor'
        },
        'scene2': {
            'section-1': 'anchor1'
        },
        'scene3': {
            'section-2': 'anchor2'
        },
        'scene4': {
            'section-3': 'anchor3'
        },
        'scene5': {
            'section-4': 'anchor4'
        }
    }

    for (var key in scenes) {
        // skip loop if the property is from prototype
        if (!scenes.hasOwnProperty(key)) continue;

        var obj = scenes[key];

        for (var prop in obj) {
            // skip loop if the property is from prototype
            if (!obj.hasOwnProperty(prop)) continue;

            new ScrollMagic.Scene({
                    triggerElement: '#' + prop
                })
                .setClassToggle('#' + obj[prop], 'active')
                .addTo(controller);
        }
    }


    // Change behaviour of controller
    // to animate scroll instead of jump
    controller.scrollTo(function (target) {

        TweenMax.to(window, 0.5, {
            scrollTo: {
                x: target,
                autoKill: true // Allow scroll position to change outside itself
            },
            ease: Cubic.easeInOut
        });

    });


    //  Bind scroll to anchor links using Vanilla JavaScript
    var anchor_nav = document.querySelector('.anchor-nav');

    anchor_nav.addEventListener('click', function (e) {
        var target = e.target,
            id = target.getAttribute('href');

        if (id !== null && id.length > 0) {
            e.preventDefault();
            controller.scrollTo(id);

            if (window.history && window.history.pushState) {
                history.pushState("", document.title, id);
            }
        }
    });

    /////////////////////////////////// testing this
    $(function () { // wait for document ready
        // build tween
        var tween = new TimelineMax()
            .add([
				TweenMax.to("#parallaxContainer .layer1", 1, {
                    backgroundPosition: "-40% 0",
                    ease: Linear.easeNone
                }),
				TweenMax.to("#parallaxContainer .layer2", 1, {
                    backgroundPosition: "-500% 0",
                    ease: Linear.easeNone
                }),
				TweenMax.to("#parallaxContainer .layer3", 1, {
                    backgroundPosition: "-225% 0",
                    ease: Linear.easeNone
                })
			]);

        // build scene
        var scene = new ScrollMagic.Scene({
                triggerElement: "#parallaxContainer",
                duration: 2000,
                offset: 450
            })
            .setTween(tween)
            .setPin("#parallaxContainer")
            .addIndicators() // add indicators (requires plugin)
            .addTo(controller);
    });

}
