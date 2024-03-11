

## Sequelize commands

### Generate model
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

### Generate migration
npx sequelize-cli migration:create --name modify_users_add_new_fields

### Run Migration
npx sequelize-cli db:migrate

### Undo Migration
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js

### Create Seed
npx sequelize-cli seed:generate --name demo-user

### Run seed
npx sequelize-cli db:seed:all

### Undo seed
npx sequelize-cli db:seed:undo