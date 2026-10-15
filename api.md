это просто файл с api проекта, что бэк мне скидывает, буду все в кучу кидать

https://alumni.fourodev.ru/api/me/
Первый запрос
вот ответ
{"message":{"id":1,"login":"admin ","email":"mikhailmasorin@gmail.com ","name":"name ","surname":"surname
","last_active_date":"2026-09-30 18:59:59"},"success":true}



https://alumni.fourodev.ru/api/auth_email_password/
Вход по паролю и мылу
Запрос
{
"email":"faraon111@yandex.ru",
"password":"admin"
}
ответ
{"success":true,"message":{"id":1,"login":"admin ","email":"faraon111@yandex.ru ","name":"name ","surname":"surname
","token":"5555555","registration_date":"2026-09-30 17:36:39.894785","last_active_date":"2026-10-06 17:27:45+03"}}
Пароль храниться в бд md5