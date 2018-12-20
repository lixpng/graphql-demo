# docker-graphql-demo

一个基于 `Apollo` 和 `express` 的 `GraphQL` 服务端例子，使用 `Docker` 部署。本来想用 `graphql.js` 实现的，发现它只能说是个工具库，并不能搭建一个比较完整的服务，比如在使用 `GraphQL scheam language` 定义 `schema` 时，没法给每个字段都传入  `resolver`，只能使用如下写法:
```javascript
  new GraphQLObjectType({
    field: {
      name: String
    },
    resolver(obj, params, ctx, schema) {
      return ...
    }
  })
```
故使用完整的 `Apollo` 实现

#### 使用
运行
```
npm i
sudo docker-compose up
```

### 注意
其中 `wait-for-it.sh` 来自 https://github.com/vishnubob/wait-for-it，是为了保证 `Graphql` 服务在 `mongodb` 服务启动之后再启动

