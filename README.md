# parseuri


### Usage
```
var parsed = parseuri('http://userid:password@login.bizarre.example.co.kr:8080/setup/login.php?uid=13&mode=safe&ret=true#LoginBox');

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
 */
```