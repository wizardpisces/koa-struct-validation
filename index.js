const validateApiSchema = function (model) {
    const keysToValidate = Object.keys(model.schema)

    return async (ctx, next) => {
        let clientData = {};
        if (ctx.request.method === 'POST') {
            clientData = ctx.request.body;
        } else if (ctx.request.method === 'GET') {
            clientData = ctx.request.query
        }

        let data = keysToValidate.reduce((res, key) => {
            res[key] = clientData[key];
            return res;
        }, {})

        try {
            model(data)
        } catch (err) {
            ctx.throw(422, err)
            return
        }

        ctx._struct_data = data;

        await next()
    }
}

module.exports = validateApiSchema
