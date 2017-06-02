
(function (cs, ctil) {

    "use strict";

    var canvas;

    function getImage(imageId) {

        var width = 256;
        var height = 256;
        var bytesPerPixel = 1;

        function getPixelData()
        {
            if(!canvas) {
                canvas = document.createElement('canvas');
            }

            var context = canvas.getContext('2d');

            canvas.width = width;
            canvas.height = height;

            context.fillStyle='white';
            context.font = "24px Arial";
            var text = imageId.substring(9);
            ctil.wrapText(context, text, 5, 24, width, 20);

            return ctil.canvasToUint8Array(context);
        }

        var image = {
            imageId: imageId,
            minPixelValue : 0,
            maxPixelValue : 255,
            slope: 1.0,
            intercept: 0,
            windowCenter : 127,
            windowWidth : 256,
            render: cs.renderGrayscaleImage,
            getPixelData: getPixelData,
            rows: height,
            columns: width,
            height: height,
            width: width,
            color: false,
            columnPixelSpacing: .8984375,
            rowPixelSpacing: .8984375,
            sizeInBytes: width * height * bytesPerPixel
        };

        var deferred = $.Deferred();
        deferred.resolve(image);
        return deferred;
    }

    // register our imageLoader plugin with cornerstone
    cs.registerImageLoader('string', getImage);
}(cornerstone, cornerstoneTestImageLoader));