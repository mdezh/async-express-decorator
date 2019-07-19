Wrapper for express routers or app for transparent work with async controllers and error handling.

Usage:

```javascript
const express = require("express")
const toAsyncRouter = require("async-express-router")

const router = toAsyncRouter(express.Router())

router.get('/some-route', someAsyncController)
```

and so on.

Thrown errors can be catched with standard express middleware.

By default decorator works for methods: get, post, delete. If you want extend or shrink this list, use toAsyncRouter.setMethods() before first toAsyncRouter() call:

```javascript
const express = require("express")
const toAsyncRouter = require("async-express-router")

toAsyncRouter.setMethods(['get', 'post', 'delete', 'put', 'head'])

const router = toAsyncRouter(express.Router())

router.get('/some-route', someAsyncController)
```
