const asyncHandler = (func) => (req, res, next) => Promise.resolve(func(req, res, next)).catch(next)

let methods = [
    'get',
    'post',
    'delete'
]

function toAsyncRouter(router) {
    for (let key in router) {
        if (methods.indexOf(key) !== -1) {
            let method = router[key]
            router[key] = (...args) => {
                if (args.length > 0) {
                    args[args.length-1] = asyncHandler(args[args.length - 1])
                }
                return method.apply(router, args)
            }
        }
    }
    return router
}

toAsyncRouter.setMethods = (methodsForTransform) => {
    methods = methodsForTransform.slice()
}


module.exports = toAsyncRouter
