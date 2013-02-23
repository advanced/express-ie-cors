/**
 *
 * @package     express-ie-cors
 * @category    Express Middleware
 * @version     0.9.3
 * @copyright   Copyright (c) 2012-2013 - All rights reserved.
 * @license     MIT License
 * @author      Halid Rian <rian@advanced.net.tw>
 *
 */
var useragent = require('useragent');

module.exports = function (options) {
    options = options || {};
    var newContentType = options.contentType || 'application/json;charset=utf-8"';

    return function (req, res, next) {
        var useragentString = req.headers['user-agent'];

        var contentType = req.headers['content-type'] || '';

        var ua = useragent.lookup(useragentString);
        // we are indeed using IE
        if (ua && ua.family === 'IE' && (ua.major === '8' || ua.major === '9')) {
            if (req.headers.accept === '*/*') {
                if (!contentType.length || contentType === 'text/plain') {
                    req.headers['content-type'] = newContentType;
                }
            }

        }

        next();
    };
};