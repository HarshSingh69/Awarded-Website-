const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function mousecursorfollow(xscale, yscale){
    window.addEventListener("mousemove", function(details){
        document.querySelector('#minicircle').style.transform = `translate(${details.clientX}px, ${details.clientY}px)`; 
    });
}

function firstpageanimate(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem",{
        y: '0',
        duration: 1.5,
        delay: -1,
        ease: Expo.easeOut,
        stagger: 0.2
    })
    .from("#herofooter",{
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeOut
    })
}

var timeout;
function circlechaptakaro(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove",function(details){
            clearTimeout(timeout);

            var xdiff = details.clientX - xprev;
            var ydiff = details.clientY - yprev;

            xscale = gsap.utils.clamp(.8, 1.2, xdiff);
            yscale = gsap.utils.clamp(.8, 1.2, ydiff);

            xprev =  details.clientX;
            yprev =  details.clientY;

            mousecursorfollow(xscale,yscale);

            timeout = setTimeout(function(){
                document.querySelector('#minicircle').style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1,1)`; 
            },100);
    });
}
// function call's
circlechaptakaro();
firstpageanimate();
mousecursorfollow();

document.querySelectorAll(".elem").forEach(function(elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave",function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });
    
    elem.addEventListener("mousemove", function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-15, 15, diffrot * 0.4),
        });
    });
   
});