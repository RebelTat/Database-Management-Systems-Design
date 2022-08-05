const defaultRouter = require('./routes/default');
const koa = require('koa');
const api = new koa();
const bodyparser = require('koa-bodyparser');
const koajson = require('koa-json');

const API_PORT = 8044;

api.use(async (ctx, next)  => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`Type:${ctx.method} Path:${ctx.url} Time: ${rt}`);
});

api.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`)
});

api.use( async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        ctx.body = e.sqlMessage ?? 'There was an error in the API!';
        ctx.status = 500;
        console.log(e);
    }
});

api.use(bodyparser());
api.use(koajson());


defaultRouter(api);

api.listen(API_PORT, () => {
    console.log(`The Api has started on port: ${API_PORT}`);
});