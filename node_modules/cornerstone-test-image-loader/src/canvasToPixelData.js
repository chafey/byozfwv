
(function (cs, ctil) {

    "use strict";

    // converts the contents of a canvas element to grayscale Uint8Array based on luminance
    // including the alpha channel
    function canvasToUint8Array(context) {
        var canvas = context.canvas;
        var arrayBuffer = new ArrayBuffer(canvas.width * canvas.height);
        var pixelData = new Uint8Array(arrayBuffer);

        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imageData.data;
        for(var i= 0, j=0; i < pixels.length; i+=4, j++) {
            var luminance = ((pixels[i] + pixels[i+1] + pixels[i+2]) / 3) * pixels[i+3] / 256;
            pixelData[j] = luminance;
        }

        return pixelData;
    }

    ctil.canvasToUint8Array = canvasToUint8Array;

}(cornerstone, cornerstoneTestImageLoader));