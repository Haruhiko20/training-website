import { injectable } from 'inversify';
import { Capybara, ICapybara } from '../models/capybara';

// Клас-репозиторій для роботи з капібаруми
// Анотація injectable дозволяє впровадити цей репозиторій через IoC контейнер
@injectable()
export class CapybaraRepository {
    // Метод для отримання всіх капібар з бази даних
    public async findAll(): Promise<ICapybara[]> {
        return Capybara.find();
    }

    // Метод для пошуку капібари за унікальним ідентифікатором
    public async findById(id: string): Promise<ICapybara | null> {
        return Capybara.findById(id);
    }

    // Метод для створення нової капібари в базі даних
    public async create(capybaraData: ICapybara): Promise<ICapybara> {
        const capybara = new Capybara(capybaraData);
        return capybara.save();
    }

    // Метод для видалення капібар за ідентифікатором
    public async delete(id: string): Promise<boolean> {
        const result = await Capybara.findByIdAndDelete(id);
        return result !== null;
    }

    // Метод для повного оновлення даних про капібару (заміна всіх полів)
    public async update(id: string, capybaraData: ICapybara): Promise<ICapybara | null> {
        return Capybara.findByIdAndUpdate(id, capybaraData, { new: true });
    }

    // Метод для часткового оновлення даних про капібару (оновлення лише вказаних полів)
    public async patch(id: string, capybaraData: Partial<ICapybara>): Promise<ICapybara | null> {
        return Capybara.findByIdAndUpdate(id, { $set: capybaraData }, { new: true });
    }
}
