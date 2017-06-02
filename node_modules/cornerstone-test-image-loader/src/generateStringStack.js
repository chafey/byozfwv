
(function (cs, ctil) {

    "use strict";

    // returns an array of imageId's that will produce images using the string image loader
    // with the image number embedded in the image.
    // Parameters:
    //   end - the last image number in the range to generate (required)
    //   start - the first image number in the range to generate (default is 1)
    //   prefix - the prefix string (default is '')
    //   suffix - the suffix string (default is '')
    function generateStringStack(end, start, prefix, suffix) {
        if(!end || isNaN(parseInt(end))) {
            throw new Error('generateStringStack - end parameter is required and must be a number');
        }
        if(start && isNaN(parseInt(start))) {
            throw new Error('generateStringStack - start parameter was specified but is not a number');
        }

        start = start || 1;
        prefix = prefix || '';
        suffix = suffix || '';
        var imageIds = [];
        for(var i=start; i <= end; i++) {
            var imageId = "string://" + prefix + i + suffix;
            imageIds.push(imageId);
        }
        return imageIds;
    }

    ctil.generateStringStack = generateStringStack;

}(cornerstone, cornerstoneTestImageLoader));