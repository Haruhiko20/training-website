import { Router, Request, Response } from 'express';
import { container } from '../config/container';
import { CapybaraRepository } from '../repositories/CapybaraRepository';

// Створюємо новий роутер Express
const router = Router();
// Отримуємо екземпляр репозиторію капібар з контейнера інверсії залежностей
const capybaraRepository = container.get(CapybaraRepository);

// Роутер для HTTP метода GET / - отримання всіх записів капібар
router.get('/', (async (_req: Request, res: Response) => {
    try {
        // Отримуємо всі записи капібар з бази даних через репозиторій
        const capybaras = await capybaraRepository.findAll();
        res.json(capybaras);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода GET /:id - отримання запису одного капібару за ідентифікатором
router.get('/:id', (async (req: Request, res: Response) => {
    try {
        // Пошук капібару за ідентифікатором
        const capybara = await capybaraRepository.findById(req.params.id);
        if (capybara) {
            res.json(capybara);
        } else {
            // Якщо капібара не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис капібару не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода POST / - створення нового запису капібару
router.post('/', (async (req: Request, res: Response) => {
    try {
        // Створюємо новий запис капібари з даних запиту
        const newCapybara = await capybaraRepository.create(req.body);
        // Повертаємо статус 201 (Created) і дані створеного капібару
        res.status(201).json(newCapybara);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода PUT /:id - повне оновлення запису капібару
router.put('/:id', (async (req: Request, res: Response) => {
    try {
        // Перевірка наявності всіх обов'язкових полів для PUT запиту
        const requiredFields = ['name', 'age', 'height', 'weight', 'gender'];
        const missingFields = requiredFields.filter(field => !(field in req.body));

        // Якщо є відсутні поля, повертаємо помилку 400 Bad Request
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Відсутні обов'язкові поля: ${missingFields.join(', ')}`,
            });
        }

        // Оновлюємо капібар з вказаним ID
        const capybara = await capybaraRepository.update(req.params.id, req.body);
        if (capybara) {
            return res.json(capybara);
        } else {
            // Якщо капібара не знайдений, повертаємо 404 помилку
            return res.status(404).json({ message: 'Запис капібару не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        return res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода PATCH /:id - часткове оновлення запису капібару
router.patch('/:id', (async (req: Request, res: Response) => {
    try {
        // Часткове оновлення запису капібар - передаються лише ті поля, які потрібно змінити
        const capybara = await capybaraRepository.patch(req.params.id, req.body);
        if (capybara) {
            res.json(capybara);
        } else {
            // Якщо капібара не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис капібару не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода DELETE /:id - видалення запису капібару
router.delete('/:id', (async (req: Request, res: Response) => {
    try {
        // Видаляємо дані про капібару за ID
        const capybara = await capybaraRepository.delete(req.params.id);
        if (capybara) {
            // У разі успіху повертаємо повідомлення про видалення
            res.json({ message: 'Запис про капібару видалено' });
        } else {
            // Якщо капібара не знайдена, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис про капібару не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

export default router;
