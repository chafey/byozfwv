(function (cs, ctil) {

    "use strict";

    function getParam(param, defaultValue) {
        var num = parseFloat(param);
        if(isNaN(num)) {
            return defaultValue;
        }
        return num;
    }

    function getImage(imageId) {

        var str = imageId.substring(7);
        var params = str.split(',');
        var width = getParam(params[0], 256);
        var height = getParam(params[1], 256);
        var bitsStored = getParam(params[2], 8);
        var columnPixelSpacing = getParam(params[3], 1.0);
        var rowPixelSpacing = getParam(params[4], 1.0);
        var slope = getParam(params[5], 1.0);
        var intercept = getParam(params[6], 0.0);

        var bytesPerPixel = 1;
        if(bitsStored < 1 || bitsStored >16) {
            console.log("cannot generate ramp image with bitsStored " + bitsStored);
            bitsStored = 8;
        }
        if(bitsStored > 8) {
            bytesPerPixel = 2;
        }

        var maxStoredValue = (1 << bitsStored);
        var step = maxStoredValue / width;

        function getPixelData()
        {
            var arrayBuffer = new ArrayBuffer(width * height * bytesPerPixel);
            var pixelData;
            if(bytesPerPixel === 1) {
                pixelData = new Uint8Array(arrayBuffer);
            } else {
                pixelData = new Uint16Array(arrayBuffer);
            }
            var i=0;
            for(var y=0; y < height; y++) {
                for(var x=0; x < width; x++) {
                    pixelData[i++] = x * step;
                }
            }
            return pixelData;
        }

        var minValue = 0 * slope + intercept;
        var maxValue = (maxStoredValue-1) * slope + intercept;

        var image = {
            imageId: imageId,
            minPixelValue : 0,
            maxPixelValue : maxStoredValue -1,
            slope: slope,
            intercept: intercept,
            windowCenter : (minValue + maxValue) / 2,
            windowWidth : (maxValue - minValue),
            render: cs.renderGrayscaleImage,
            getPixelData: getPixelData,
            rows: height,
            columns: width,
            height: height,
            width: width,
            color: false,
            columnPixelSpacing: columnPixelSpacing,
            rowPixelSpacing: rowPixelSpacing,
            sizeInBytes: width * height * bytesPerPixel
        };

        var deferred = $.Deferred();
        deferred.resolve(image);
        return deferred;
    }


    // register our imageLoader plugin with cornerstone
    cs.registerImageLoader('ramp', getImage);

}(cornerstone, cornerstoneTestImageLoader));