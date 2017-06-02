
(function (cs, ctil) {

    "use strict";


    // function to draw text to a canvas with word wrap
    // ripped from http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
    }

    ctil.wrapText = wrapText;

}(cornerstone, cornerstoneTestImageLoader));