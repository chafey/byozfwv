// WARNING: This image loader base 64 encodes the pixel data so cornerstone can view images without requiring
// a server (for development and example use cases).  A better option that base 64 encoding your pixel data
// is to serve up the DICOM P10 via HTTP server and load it using the cornerstoneWADOImageLoader here:
// https://github.com/chafey/cornerstoneWADOImageLoader

(function (cs, ctil) {

    "use strict";

    var image1PixelData = ctil.getPixelData(ctil.base64Images.ctimage);

    function getExampleImage(imageId) {

        var width = 512;
        var height = 512;

        function getPixelData()
        {
            if(imageId == 'ctexample://1')
            {
                return image1PixelData;
            }
            throw "unknown imageId";
        }

        var image = {
            imageId: imageId,
            minPixelValue : 0,
            maxPixelValue : 4096,
            slope: 1.0,
            intercept : -1024,
            windowCenter : 40,
            windowWidth : 400,
            render: cs.renderGrayscaleImage,
            getPixelData: getPixelData,
            rows: height,
            columns: width,
            height: height,
            width: width,
            color: false,
            columnPixelSpacing: 0.67578,
            rowPixelSpacing: 0.67578,
            sizeInBytes: width * height * 2
        };

        var deferred = $.Deferred();
        deferred.resolve(image);
        return deferred;
    }

    // register our imageLoader plugin with cornerstone
    cs.registerImageLoader('ctexample', getExampleImage);

}(cornerstone, cornerstoneTestImageLoader));