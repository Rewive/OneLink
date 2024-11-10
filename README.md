# OneLink Project

![logo](https://via.placeholder.com/600x200.png?text=OneLink+Edu+Logo)

---

### 🚀 О проекте

`OneLink` - Экосистема объеденяющая микросервисы

`OneLink Edu` — это проект, состоящий из двух мощных микросервисов, разработанных с использованием самых современных технологий. Он предоставляет пользователям удобную платформу для обучения и взаимодействия. Проект использует **PostgreSQL** для обеспечения надежного хранения данных.

`OneLink Conference Platform` — это мощная платформа для проведения онлайн конференций и вебинаров, созданная с использованием **NestJS**, **TypeScript** и **Socket.io**. Платформа позволяет легко организовывать и управлять событиями, а также взаимодействовать с участниками в реальном времени.


### 🛠 Используемые технологии

- **Nest.js**: Серверная часть на основе JavaScript для обработки запросов.
- **TypeScript**: Язык программирования, который добавляет статическую типизацию к JavaScript.
- **Socket.io**: Библиотека для обеспечения двусторонней связи в реальном времени между клиентами и серверами.
- **Express.js**: Фреймворк для построения API и веб-приложений.
- **PostgreSQL**: Реляционная СУБД для хранения данных.
- **Docker**: Платформа для создания, развертывания и запуска приложений в контейнерах.

---

### 🔧 Как запустить проект

1. **Клонируйте репозиторий:**

   ```bash
   git clone https://github.com/Rewive/OneLink.git
   cd OneLink
   ```

2. **Перейдите в папку с проектом:**

   ```bash
   cd OneLink
   ```

3. **Запустите сборку с помощью Docker Compose:**

   Убедитесь, что у вас установлен [Docker](https://www.docker.com/get-started) и [Docker Compose](https://docs.docker.com/compose/install/).

   ```bash
   docker-compose up --build
   ```

   Это создаст и запустит все необходимые контейнеры, включая PostgreSQL, для работы микросервисов.

4. **Доступ к API:**

   После успешного запуска, вы сможете получить доступ к API по следующим адресам:

   - Микросервис `courses`: http://localhost:3001
   - Микросервис `conferences`: http://localhost:3000

5. **Проверка доступности PostgreSQL:**

   PostgreSQL будет доступен на порту `5432`, и вы можете использовать любые PostgreSQL-клиенты для подключения к базе данных `mentordb`. Используйте следующие учетные данные:

   - **Пользователь**: `lmentor`
   - **Пароль**: `2i8xjsy62hGDb23`

---

### 🤝 Содействие

Если вы хотите внести свой вклад в проект, создайте ветку для своей функции или исправления:

```bash
git checkout -b my-feature
```

Проведите свои изменения, добавьте их и создайте Pull Request!

---

### 📞 Связь

Если у вас есть вопросы или предложения, пожалуйста, свяжитесь через [Telegram](https://t.me/rewive).

---

Спасибо за интерес к `OneLink`! Давайте строить будущее образования вместе! 🌟