/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Derzsi Norbert <nt.derzsi@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

/** 
 * @type {RegExp}
 * @see https://gist.github.com/dperini/729294#file-regex-weburl-js
 * @note Modified version with captures 
*/ 
var rURL = new RegExp(
  "^" +
    // protocol identifier
    "(?:((?:https?|ftp))://)" +
    // user:pass authentication
    "(?:(\\S+(?::\\S*)?)@)?" +
    "((?:" +
      // IP address exclusion
      // private & local networks
      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
      "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
      "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broacast addresses
      // (first & last IP address of each class)
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
      "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
      "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +
      // host name
      "((?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+))" +
      // domain name
      "((?:\\.(?:[a-z\\u00a1-\\uffff0-9]-)*[a-z\\u00a1-\\uffff0-9]+)*)" +
      // TLD identifier
      "((?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))" +
      // TLD may end with dot
      "\\.?" +
    "))" +
    // port number
    "(?::(\\d{2,5}))?" +
    // leaf
    "(?:[/](\\S*?))?" +
    "(?:[?](\\S*?))?" +
    "(?:[#](\\S*?))?" +
  "$", "i"
);    


/** @type {RegExp} */ var uriClr, rUriClr = new RegExp('^['+(uriClr = '!"#$%&\'()*+,-./@:;<=>[\\]^_`{|}~')+']+|['+uriClr+']+$', 'g');
/** @type {RegExp} */ var rTrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/;

/**
 * @function parseurl
 * @version 0.1
 * @param {string} uri
 * @returns {Object} 
 * @returns {string}        Object.uri           The full URI.
 * @returns {string}        Object.protocol      The protocol (e.g. http://, ftp://, ...).
 * @returns {string}        Object.tld           The top level domain (e.g. com, org, net, ...).
 * @returns {string}        Object.port          The port number (e.g. :8080).
 * @returns {string}        Object.subdomain     The highest level (followed by the protocol) domain.
 * @returns {string}        Object.domain        The full domain excluding the sub-, and the top level domain.
 * @returns {string}        Object.path          The path followed by the domain and port (e.g my/directory/index.html)
 * @returns {string}        Object.query         The url parameters (e.g ?articleid=9374&tpl=std)
 * @returns {string}        Object.anchor        The url anchor (e.g #selected_area)

 * @returns {Object<string,any>} Object.data          The url parameters parsed into an object.
 * @returns {Array<string>}      Object.domains       The list of domain including the sub-, and top level domain.
 * @returns {Object}             Object.auth          The url authentication parameters.
 * @returns {Object}             Object.auth.username Authentication username.
 * @returns {Object}             Object.auth.password Authentication password.
 *
 */
var parseurl = function(uri) {  
    var 
    /** @type {Object} */       m,
    /** @type {number} */       n,
    /** @type {number} */       l,
    /** @type {string|Array} */ v, 
    /** @type {Object} */       ud = {};

    // Clean URI
    uri = uri.replace(rUriClr,'');

    if ((m = !!/.*?:\/\//.exec(uri) ? uri.match(rURL) : ('http://'+uri).match(rURL))) {
        ud = {
            'uri' : uri,
            'protocol'  : m[1],
            'subdomain' : !!m[5] ? m[4] : '',
            'domain'    : ((!!m[5] ? m[5] : m[4]) || '').replace(/\./,''),
            'tld'       : !!m[6] ? m[6].replace(/./,'') : '',
            'port'      : parseInt(m[7], 10) || '',
            'host'      : m[3] || '',
            'path'      : m[8] || '',
            'query'     : m[9] || '',
            'anchor'    : m[10] || '',
            'data'      : {},
            'auth'      : {
                'username' : undefined,
                'password' :undefined
            },
        };

        ud['domains'] = [ud['subdomain']].concat(ud['domain'].split('.'), ud['tld']);
        if (ud['domain'] === '') ud['ip'] = ud['host'];
        if (typeof m[2] !== 'undefined' && ((m[2] = m[2].split(':')))) {
            ud['auth'] = {
                'username': (m[2] ? m[2][0] : ''),
                'password': (m[2] ? m[2][1] : '')
            };   
        }

        if (typeof m[9] !== 'undefined' && (m[9] = m[9].split('&'))) {
            for (n=0,l=m[9].length;n<l;n++) {
                v = m[9][n].split('=');
                v[0] = v[0].replace(rTrim, '');
                ud['data'][v[0]] = isFinite(v[1]) ? parseInt(v[1],10) : /false/i.exec(v[1]) ? false : /true/i.exec(v[1]) ? true : v[1];
            }
        }
        return ud;
    } else { 
        return false;
    }
};




