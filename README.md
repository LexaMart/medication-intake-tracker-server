## Medication Intake Tracker Server

### Описание на русском (RU)

Серверная часть **Medication Intake Tracker** представляет собой приложение на базе Express и базу данных PostgreSQL.

### Установка и запуск сервера

1. Установите все зависимости, выполнив команду: npm install
2. Разверните базу данных. Это можно сделать с помощью Docker Compose. Пример конфигурации для `.env` файла:
   PG_HOST=localhost PG_USER=postgres PG_PASS=postgres PG_PORT=5432 PG_NAME=postgres
3. После настройки базы данных, запустите миграцию для создания таблиц. Миграция находится в файле `20240901193100_init_migration.txt`.

Примените миграцию, используя соответствующую команду в вашем миграционном инструменте.

### Запуск сервера

После настройки и миграции базы данных, запустите сервер командой: npm start

### Взаимодействие клиента с сервером

Чтобы клиентское приложение могло взаимодействовать с сервером, необходимо открыть порты или задеплоить сервер и предоставить URL-адрес. Либо можно развернуть сервер локально и использовать ngrok (рекомендуется) для создания публичного URL-адреса.

---

## Medication Intake Tracker Server

### Description in English (EN)

The server side of **Medication Intake Tracker** is an Express application with a PostgreSQL database.

### Server Setup and Launch

1. Install all dependencies by running: npm install
2. Set up the database. You can deploy the database using Docker Compose. Example configuration for the `.env` file: PG_HOST=localhost PG_USER=postgres PG_PASS=postgres PG_PORT=5432 PG_NAME=postgres
3. After setting up the database, run the migration to create the necessary tables. The migration file is `20240901193100_init_migration.txt`.

Apply the migration using your migration tool's corresponding command.

### Starting the Server

Once the database is configured and the migration is applied, start the server with: npm start

### Client-Server Interaction

To allow the client application to interact with the server, you need to either open the necessary ports and deploy the server with a public URL, or deploy it locally and use ngrok (recommended) to expose the server via a public URL.
