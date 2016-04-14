# parseuri
Robust web URI validation and parsing.

Validation and testing based on [https://mathiasbynens.be/demo/url-regex/](https://mathiasbynens.be/demo/url-regex/) (see [tests.html](tests.html))


### Usage
```
var parsed = parseuri('http://userid:passwo ond@login.bizarre.example.co.kr:8080/setup/login.php?uid=13&mode=safe&ret=true#LoginBox');
```

### Documentation
```
/**
 * @function parseuri
 * @version 1.0
 * @param {string} uri
 * @returns {Object.<string, any>|boolean} Returns false is URI is not valid.

 * @returns {string}        Object.uri           The full URI.
 * @returns {string}        Object.protocol      The protocol (e.g. http://, ftp://, ...).
 * @returns {string}        Object.tld           The top level domain (e.g. com, org, net, ...).
 * @returns {string}        Object.port          The port number (e.g. :8080).
 * @returns {string}        Object.subdomain     The highest level (followed by the protocol) domain.
 * @returns {string}        Object.domain        The full domain excluding the sub-, and the top level domain.
 * @returns {string}        Object.path          The path followed by the domain and port (e.g my/dir/index.html)
 * @returns {string}        Object.query         The url parameters (e.g ?articleid=9374&tpl=std)
 * @returns {string}        Object.anchor        The url anchor (e.g #selected_area)
 * @returns {string}        Object.ip            The IP Address is given (conditional)

 * @returns {Object.<string,any>} Object.data          The url parameters parsed into an object.
 * @returns {Array.<string>}      Object.domains       The list of domains inc. the sub-, and top level domain.

 * @returns {Object.<string,string>} Object.auth          The url authentication parameters.
 * @returns {string}                 Object.auth.username Authentication username.
 * @returns {string}                 Object.auth.password Authentication password.
 *
 */
```

Related Links
-------------

- [file-regex-weburl-js](https://gist.github.com/dperini/729294#file-regex-weburl-js)
- [In search of the perfect URL validation regex](https://mathiasbynens.be/demo/url-regex/)