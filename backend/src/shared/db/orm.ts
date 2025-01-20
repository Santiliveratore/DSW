import { MikroORM } from "@mikro-orm/core";
import { MySqlDriver } from "@mikro-orm/mysql";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { DB_NAME,DB_HOST,DB_USER,DB_PASSWORD,DB_PORT } from "../../config.js";

export const orm = await MikroORM.init({
    entities:['dist/**/*.entity.js'],
    entitiesTs:['src/**/*.entity.ts'],
    allowGlobalContext: true,
    dbName:DB_NAME,
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    port:DB_PORT,
    driver: MySqlDriver,
    highlighter: new SqlHighlighter(),
    debug:true,

})