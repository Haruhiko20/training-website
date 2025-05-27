// Експорт специфікації Swagger/OpenAPI для документації про API
export const swaggerSpec = {
    // Версія специфікації OpenAPI
    openapi: '3.0.0',
    // Загальна інформація про API
    info: {
        title: 'API Сайту про Капібар',
        version: '1.0.0',
        description: 'Документація API для Сайту про Капібар',
    },
    // Налаштування серверів для тестування API
    servers: [
        {
            url:
                process.env.CODESPACE_NAME !== undefined
                    ? `https://${process.env.CODESPACE_NAME}-5000.app.github.dev`
                    : 'http://localhost:5000',
            description: 'Development server',
        },
    ],
    // Визначення роутерів API та операцій з ними
    paths: {
        '/api/capybaras': {
            // GET запит для отримання всіх капібар
            get: {
                summary: 'Отримати всіх капібар',
                responses: {
                    '200': {
                        description: 'Список всіх капібар',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Capybara' },
                                },
                            },
                        },
                    },
                },
            },

            // POST запит для створення нового капібару
            post: {
                summary: 'Створити нову капібару',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Capybara' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: "Створений об'єкт капібару",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Capybara' },
                            },
                        },
                    },
                },
            },
        },

        // Операції для конкретного капібару за ID
        '/api/capybaras/{id}': {
            // GET запит для отримання капібару за ID
            get: {
                summary: 'Отримати капібару за ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID капібару',
                        activityTime: '',
                    },
                ],
                responses: {
                    '200': {
                        description: "Об'єкт капібару",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Capybara' },
                            },
                        },
                    },
                    '404': { description: 'Капібару не знайдено' },
                },
            },

            // PUT запит для повного оновлення капібару за ID
            put: {
                summary: 'Повністю оновити капібару',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID капібару',
                        activityTime: '',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Capybara' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт капібару",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Capybara' },
                            },
                        },
                    },
                    '404': { description: 'Капібару не знайдено' },
                },
            },
            // PATCH запит для часткового оновлення капібару за ID
            patch: {
                summary: 'Частково оновити капібару',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID капібару',
                        activityTime: '',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Capybara' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт капібару",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Capybara' },
                            },
                        },
                    },
                    '404': { description: 'Капібару не знайдено' },
                },
            },
            // DELETE запит для видалення даних про капібару за ID
            delete: {
                summary: 'Видалити дані про капібару',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID капібару',
                        activityTime: '',
                    },
                ],
                responses: {
                    '200': { description: 'Повідомлення про успішне видалення' },
                    '404': { description: 'Капібару не знайдено' },
                },
            },
        },
    },

    // Визначення компонентів для повторного використання
    components: {
        // Схеми даних
        schemas: {
            // Схема об'єкта Капібара
            Capybara: {
                type: 'object',
                required: ['name', 'age', 'height', 'weight', 'gender'],
                properties: {
                    name: {
                        type: 'string',
                        description: "Ім'я капібару",
                    },
                    age: {
                        type: 'number',
                        description: 'Вік капібару у роках',
                    },
                    height: {
                        type: 'number',
                        description: 'Висота капібару в сантиметрах',
                    },
                    weight: {
                        type: 'number',
                        description: 'Вага капібару в кілограмах',
                    },
                    gender: {
                        type: 'string',
                        enum: ['male', 'female'],
                        description: 'Стать капібару',
                    },
                    description: {
                        type: 'string',
                        description: "Опис капібару (необов'язкове поле)",
                    },
                    activityTime: {
                        type: 'string',
                        description: 'Час активності',
                    },
                },
            },
        },
    },
};
