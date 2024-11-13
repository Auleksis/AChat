# Как запустить проект

## 1. Создайте .env файл в корневой папке проекта, если такого ещё нет

```.env
MONGO_INITDB_ROOT_USERNAME=yourusername
MONGO_INITDB_ROOT_PASSWORD=yourpassword
MONGO_INITDB_DATABASE=AChatDB

DATABASE_URI="mongodb://yourusername:yourpassword@db_v_2:27017/AChatDB?authSource=admin&authMechanism=SCRAM-SHA-256"

JWT_KEY=yourkey
```

**Если вы получили проект из архива, значит .env файл уже присутствует!**

## 2. Запустите docker на своём компьютере

Это запустит процесс, необходимый для выполнения следующего шага.

## 3. Откройте терминал и введите команду

```shell
docker compose build
docker compose up -d
```

## 4. Откройте сайт

Введите в поисковой строке вашего браузера

```
http://localhost/
```

Нажмите Enter и регистрируйтесь :)

# Описание директорий проекта

## AChatFrontend

AChatFrontend содержит в себе frontend-часть, реализованную на React с использованием axios для вызова API сервера и React Router Dom для навигации.
По пути **AchatFrontend/nginx** находится **файл конфигурации nginx**, а также **access log**.

## chat/chat

По пути chat/chat располагается директория FastAPI-решения, ответственного за реализацию функционала чата с использованием веб-сокетов.

## website

В директории website находится FastAPI-решение, ответственное за реализацию функционала работы с комнатами и пользователями.

## db

В директории db находится файл инициализации MongoDB **mongo-init.js**, а также директория dump, сохраняющая данные БД.
