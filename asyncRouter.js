const asyncHandler = (func) => (req, res, next) => Promise.resolve(func(req, res, next)).catch(next)

// Default methods to use when calling toAsyncRouter
// must be lower case
let methods = [
    'get',
    'post',
    'put',
    'delete'
]

function toAsyncRouter(router) {
    // Store reference to the original function for calling later with our extended `route` object
	const thisRoute = router.route

    // Intercept the route function. This is implicitily called when using `router.[method]()` and explicitly called when using `router.route().[method]()`
    router.route = (path) => {
        // Store reference to the object returned from creating the new route
        const route = thisRoute.call(router, path)

        // Create a new data store like `route.methods` so that ...
        route.__methods = {}

        // ... for each method to be wrapped, we can ...
        for (const method of methods) {
            Object.defineProperty(route.methods, method, {
                // ... create a setter for the method ...
                set: (val) => {
                    if (val === true) {
                        // ... to intercept a new express layer being created ...
                        const thisLayerIndex = route.stack.length
                        setImmediate(() => {
                            const layer = route.stack[thisLayerIndex]
                            // ... and wrap the `handle` in the `asyncHandler`
                            layer.handle = asyncHandler(layer.handle)
                        })
                    }

                    Object.defineProperty(route.methods, method, {
                        // Make `method` visible on `route.methods` once value has been set for `Object.keys()` etc.
                        enumerable: true
                    })

                    // set the val to the new data store
                    route.__methods[method] = val
                },
                // retrieve value from the new data store
                get: () => {
                    return route.__methods[method]
                },
                // Allows us to update the `enumerable` property in the setter
                configurable: true
            })
        }
        // Note: for methods not defined in the `toAsyncRouter` `methods` array, `route.methods` is still an object which can have properties set and read as per normal

        // return back our extended route object for chaining with methods
        return route
    }
    
    // return back our extended router
    return router
}

toAsyncRouter.setMethods = (methodsArray) => {
    // ensure each method is lower case
    methods = methodsArray.map(method => String(method).toLowerCase())
}

toAsyncRouter.getMethods = () => methods.slice()


module.exports = toAsyncRouter
