function openSvg() {
    document.querySelector('.content').innerHTML=svg;
    centerSvg();
    window.addEventListener('resize', centerSvg );
    animate();
    document.addEventListener('animationend', animate);
}

function centerSvg() {
    var containerDOM = document.querySelector('.content');
    var svgElement = document.querySelector('svg');
    var offset = (containerDOM.clientWidth - svgElement.clientWidth) / 2;
    svgElement.setAttribute("style", "left:" + offset + "px;");
}

function animate(event) {
    var domElement = event ? event.target : null;
    if (domElement != null) {
        domElement.removeAttribute('class');
    }

    var oldStyles = document.getElementsByTagName('style');
    for (var i=0, max = oldStyles.length; i < max; i++) {
        oldStyles[i].parentNode.removeChild(oldStyles[i]);
    }

    var circles = document.querySelectorAll('circle');
    var randomNumber = Math.floor(Math.random() * circles.length)
    var circle = circles[randomNumber];

    var svg = circle.parentNode;
    svg.removeChild(circle);
    svg.appendChild(circle);

    var color = 255 - Math.floor((Math.random() * 100));
    var radius = 15 + Math.floor((Math.random() * 30));
    var css = '@keyframes blink { 0% {r:5.5}' +
                                '30% {r:' + radius + '}' + 
                                '100% {r:5.5}}' +
              '.animate { fill:rgb(' + color + ',' + color + ',' + color +');' +
                         'animation-name: blink;' +
                         'animation-duration: 1s;}';

    head = document.head || document.getElementsByTagName('head')[0];
    style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);

    circle.setAttribute('class', 'animate');
}