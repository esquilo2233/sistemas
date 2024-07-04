module.exports = {
    db: {
        client: 'pg',
        connection: {
            host: 'auth-db',
            user: 'sd',
            password: 'sd',
            database: 'sd',
            port:'5432'
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations'
        }
    }
};