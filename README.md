# parseuri
Robust web URI validation and parsing.

Validation and testing based on [https://mathiasbynens.be/demo/url-regex/](https://mathiasbynens.be/demo/url-regex/) (see tests.html)




### Usage
```
var parsed = parseuri('http://userid:passwo ond@login.bizarre.example.co.kr:8080/setup/login.php?uid=13&mode=safe&ret=true#LoginBox');

/* will return:
 * {
 *    auth: {,
 *        username:  'userid',
 *        password: 'password'
 *    },
 *    host     : 'login.bizarre.example.co.kr',
 *    protocol : 'http',
 *    subdomain: 'login',
 *    domain   : 'bizarre.example.co',
 *    tld      : 'com',
 *    port     : 8080,
 *    path     : 'setup/login.php',
 *    query    : 'uid=13&mode=safe&ret=true,
 *    anchor   : 'LoginBox',
 *    data: {
 *        uid  : 13,
 *        mode : 'safe',
 *        ret  : true
 *    }
 * }
 *
 * // Conditional values
 * {
 *    // Only if IP address given.
 *    ip: '223.255.255.254', 
 *    host: '223.255.255.254'
 *    ...
 * }
 */
```


Related Links
-------------

- [file-regex-weburl-js](https://gist.github.com/dperini/729294#file-regex-weburl-js)
- [In search of the perfect URL validation regex](https://mathiasbynens.be/demo/url-regex/) (see [tests.html](tests.html))