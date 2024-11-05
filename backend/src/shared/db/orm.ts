import { MikroORM } from "@mikro-orm/core";
import { MySqlDriver } from "@mikro-orm/mysql";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

export const orm = await MikroORM.init({
    entities:['dist/**/*.entity.js'],
    entitiesTs:['src/**/*.entity.ts'],
    allowGlobalContext: true,
    dbName:'superutn',
    host:'localhost',
    user:'root',
    password:'root',
    port:3306,
    driver: MySqlDriver,
    highlighter: new SqlHighlighter(),
    debug:true,

})