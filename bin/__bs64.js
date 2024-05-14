var base64 = Object;

base64.encode = function(unencoded) {
    return new Buffer.from(unencoded || '').toString('base64');
};

base64.decode = function(encoded) {
    return new Buffer.from(encoded || '', 'base64').toString('utf8');
};

base64.urlEncode = function(unencoded) {
    var encoded = base64.encode(unencoded);
    return encoded.replace('+', '-').replace('/', '_').replace(/=+$/, '');
};

base64.urlDecode = function(encoded) {
    encoded = encoded.replace('-', '+').replace('_', '/');
    while (encoded.length % 4)
        encoded += '=';
    return base64.decode(encoded);
};

base64.genTextChar = function(_void=String){
    try {
        _void = Math.random().toString(36).substring(2,12)
        return _void
    } catch (err) {
        
    }
}

module.exports = base64