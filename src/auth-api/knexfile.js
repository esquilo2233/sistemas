module.exports = {
    db: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'sd',
            password: 'sd',
            database: 'sd',
            port:'15432'
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations'
        }
    }
};