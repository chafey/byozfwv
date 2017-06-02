// WARNING: This image loader base 64 encodes the pixel data so cornerstone can view images without requiring
// a server (for development and example use cases).  A better option that base 64 encoding your pixel data
// is to serve up the DICOM P10 via HTTP server and load it using the cornerstoneWADOImageLoader here:
// https://github.com/chafey/cornerstoneWADOImageLoader

(function (ctil) {

    function str2ab(str) {
        var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
        var bufView = new Uint16Array(buf);
        var index = 0;
        for (var i = 0, strLen = str.length; i < strLen; i += 2) {
            var lower = str.charCodeAt(i);
            var upper = str.charCodeAt(i + 1);
            bufView[index] = (upper << 8) + lower;
            index++;
        }
        return bufView;
    }

    function getPixelData(base64PixelData) {
        var pixelDataAsString = window.atob(base64PixelData);
        var pixelData = str2ab(pixelDataAsString);
        return pixelData;
    }

    ctil.getPixelData = getPixelData;
} (cornerstoneTestImageLoader));