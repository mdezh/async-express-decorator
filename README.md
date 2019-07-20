Wrapper for express routers or app for transparent work with async controllers and error handling.

Usage:

```javascript
const express = require("express")
const toAsyncRouter = require("async-express-decorator")

const router = toAsyncRouter(express.Router())

router.get('/some-route', someAsyncController)
```

and so on.

Thrown errors can be catched with standard express middleware.

By default decorator works for methods: `get`, `post`, `put`, `delete`. If you want extend or shrink this list, use `toAsyncRouter.setMethods()` **before** `toAsyncRouter()` call:

```javascript
const express = require("express")
const toAsyncRouter = require("async-express-decorator")

toAsyncRouter.setMethods(['get', 'post', 'all'])

const router = toAsyncRouter(express.Router())

router.all('/some-route', someAsyncController)
```

It is also possible to get a list of methods that will be decorated:

```javascript
console.log(toAsyncRouter.getMethods())
```

