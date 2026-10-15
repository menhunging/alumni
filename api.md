# Alumni API

Базовый URL: `https://alumni.fourodev.ru/api`

## Авторизация по email и паролю

`POST /auth_email_password/`

### Запрос

```json
{
  "email": "faraon111@yandex.ru",
  "password": "admin"
}
```

### Успешный ответ

```json
{
  "success": true,
  "message": {
    "id": 1,
    "login": "admin",
    "email": "faraon111@yandex.ru",
    "name": "name",
    "surname": "surname",
    "token": "5555555",
    "registration_date": "2026-09-30 17:36:39.894785",
    "last_active_date": "2026-10-06 17:27:45+03",
    "success_profile": "1"
  }
}
```

## Запрос кода на email

`POST /auth_email/`

### Запрос

```json
{
  "email": "faraon111@yandex.ru"
}
```

### Успешный ответ

```json
{
  "success": true,
  "message": {
    "id": 1,
    "email": "faraon111@yandex.ru"
  }
}
```

## Проверка кода из email

`POST /check_code_auth_email/`

### Запрос

```json
{
  "id_user": "1",
  "code": "3008"
}
```

### Успешный ответ

```json
{
  "success": true,
  "message": {
    "id": 1,
    "login": "admin",
    "email": "faraon111@yandex.ru",
    "name": "name",
    "surname": "surname",
    "token": "5555555",
    "registration_date": "2026-09-30 17:36:39.894785",
    "last_active_date": "2026-10-06 17:27:45+03",
    "success_profile": "1"
  }
}
```

## Текущий пользователь

`POST /me/`

Заголовок авторизации:

```http
Authorization: Bearer 5555555
```

### Успешный ответ

```json
{
  "success": true,
  "message": {
    "id": 1,
    "login": "admin",
    "email": "mikhailmasorin@gmail.com",
    "name": "name",
    "surname": "surname",
    "last_active_date": "2026-09-30 18:59:59",
    "success_profile": "1"
  }
}
```
