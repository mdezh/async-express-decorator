const asyncHandler = (func) => (req, res, next) => Promise.resolve(func(req, res, next)).catch(next)

let methods = [
    'get',
    'post',
    'put',
    'delete'
]

function toAsyncRouter(router) {
    for (let key in router) {
        if (methods.includes(key)) {
            let method = router[key]
            router[key] = (path, ...callbacks) => method.call(router, path, ...callbacks.map(cb => asyncHandler(cb)))
        }
    }
    return router
}

toAsyncRouter.setMethods = (methodsArray) => {
    methods = methodsArray.slice()
}

toAsyncRouter.getMethods = () => methods.slice()


module.exports = toAsyncRouter
