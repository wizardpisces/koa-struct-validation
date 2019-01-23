# koa-struct-validation

koa2 api request params validation middleware (based on [superstruct](https://github.com/ianstormtaylor/superstruct))

Support ( Post , Get ) for not nested params check

## How to Use

```
npm install --save koa-struct-validation
```

#### Usage Example

**api.js**

```javascript

const validateApiSchema = require('koa-struct-validation');
const koaRouter = require('koa-router');
const koaBody = require('koa-body');
const API_SCHEMA_OBJ = require('./api_data_rules');
const item_api = require('../controller/item');
/*
*  /api/${path}
*/
const router = new koaRouter({
    prefix : '/api'
})
router.use(koaBody());

router.get('/item/list',validateApiSchema(API_SCHEMA_OBJ.getItemList), item_api.getItemList)

```

**api_data_rules.js**

```javascript

const {superstruct} = require('superstruct')

function numberOnly(v){
    return /^[0-9]+$/.test(v)
}

const custom_struct = superstruct({
    types : {
        id_type : v => numberOnly(v),
    }
})

const API_SCHEMA_OBJ = {
    getItemList: custom_struct({
        project_id:'id_type',
    })
}

module.exports = API_SCHEMA_OBJ

```

**controllers/item.js**

```javascript
const getItemList =  async function(ctx) {
    const query = ctx.request.query;
    let itemList = []

    ctx.body = {
        success: true,
        result: {
            list:itemList
        }
    }
}

module.exports = {
    getItemList
}

```
