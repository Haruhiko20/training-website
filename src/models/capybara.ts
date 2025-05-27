import { Schema, model } from 'mongoose';

// Інтерфейс для об'єкта "Капібара"
interface ICapybara {
    name: string; // Ім'я капібари
    age: number; // Вік капібари у роках
    height: number; // Висота капібари в сантиметрах
    weight: number; // Вага капібари в кілограмах
    gender: 'male' | 'female'; // Стать капібари: 'male' - самець, 'female' - самка
    description?: string; // Опис капібари (необов'язкове поле)
    activityTime: string; // Час активності, наприклад '06:00–09:00; 18:00–21:00'
    dateAdded: Date; // Дата додавання запису до бази даних
}

// Схема MongoDB для моделі "Капібара"
const capybaraSchema = new Schema<ICapybara>({
    name: {
        type: String,
        required: true, // Поле є обов'язковим
    },
    age: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    height: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    weight: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    gender: {
        type: String,
        required: true, // Поле є обов'язковим
        enum: ['male', 'female'], // Допустимі значення: 'male' або 'female'
    },
    description: String, // Необов'язкове текстове поле
    dateAdded: {
        type: Date,
        default: Date.now, // Значення за замовчуванням - поточна дата і час
    },
    activityTime: {
        type: String,
        required: true, // Поле є обов'язковим
    },
});

// Створення моделі Mongoose на основі схеми
export const Capybara = model<ICapybara>('Capybara', capybaraSchema);
export type { ICapybara }; // Експортуємо інтерфейс для використання в інших файлах
