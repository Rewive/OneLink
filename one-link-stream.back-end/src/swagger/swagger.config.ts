import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('API конференции с использованием WebSocket')
    .setDescription(`
      Документация для API конференции, использующей WebSocket для взаимодействия в реальном времени.
      
      Этот API предоставляет функции для управления конференциями в реальном времени с использованием WebSocket. 

      Функциональные возможности:
      - Присоединение к конференциям.
      - Отправка и получение сообщений.
      - Управление аудио/видео потоками.

      WebSocket События
      Ниже приведены основные события WebSocket, поддерживаемые данным API, с подробным описанием и примерами полезных нагрузок.

      | **Событие**           | **Описание**                                           |                          **Пример полезной нагрузки**                              |
      |-----------------------|--------------------------------------------------------|------------------------------------------------------------------------------------|
      | **joinConference**    | Присоединиться к конференции.                          | \`{"conferenceCode": "12345", "userName": "JohnDoe"}\`                             |
      | **sendMessage**       | Отправить сообщение в конференцию.                     | \`{"conferenceCode": "12345", "message": "Здравствуйте!"}\`                        |
      | **offer**             | Отправить предложение для установления видеосоединения.| \`{"room": "room123", "offer": "v=0..." }\`                                        |
      | **answer**            | Отправить ответ на предложение.                        | \`{"room": "room123", "answer": "v=0..." }\`                                       |
      | **micToggle**         | Переключить статус микрофона.                          | \`{"conferenceCode": "12345", "isMuted": true}\`                                   |
      | **videoToggle**       | Переключить статус видео.                              | \`{"conferenceCode": "12345", "isMuted": true}\`                                   |
      | **candidate**         | Отправить ICE кандидат для установления соединения.    | \`{"room": "room123", "candidate": "candidate:1 1 100 1 0.0.0.0 12345 typ host"}\` |
      |---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
      `)
    .setVersion('1.0')
    .addTag('WebSocket', 'Эндпоинты для управления WebSocket соединениями и операциями конференции')
    .setTermsOfService('http://example.com/terms') // Условия обслуживания (необязательно)
    .setContact(
      'Команда Поддержки',
      'http://example.com/contact',
      'support@example.com',
    ) // Контактные данные (необязательно)
    .setLicense('MIT', 'http://opensource.org/licenses/MIT') // Лицензия (необязательно)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
