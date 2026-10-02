export const DB = {
    users: [
        { login: 'student', password: '123', role: 'student', name: 'Иван Иванов' },
        { login: 'mentor', password: '123', role: 'mentor', name: 'Анна Смирнова' }
    ],
    course: {
        id: 1,
        title: 'QA Automation Bootcamp',
        description: 'Полный практический курс по автоматизации тестирования на Python и Selenium.',
        lessons: [
            { 
                id: 1, 
                title: 'Введение в QA', 
                text: 'На этом уроке мы разберем основные понятия обеспечения качества, чем отличается QA от QC и тестирования. Поговорим про жизненный цикл разработки ПО (SDLC).', 
                completed: true,
                isTest: false 
            },
            { 
                id: 2, 
                title: 'Локаторы Selenium', 
                text: 'Основа UI автоматизации — умение находить элементы. Вы изучите CSS селекторы и XPATH. Как писать надежные локаторы, которые не ломаются при каждом изменении верстки.', 
                completed: true,
                isTest: false 
            },
            { 
                id: 3, 
                title: 'Финальный Экзамен', 
                text: 'Поздравляем с прохождением всех материалов! Чтобы завершить курс и получить сертификат, вам необходимо сдать финальный тест.', 
                completed: false, 
                isTest: true,
                test: {
                    question: 'Какой метод используется в Selenium WebDriver (Python) для поиска первого элемента, соответствующего локатору?',
                    options: [
                        'driver.search_element()', 
                        'driver.find_elements()', 
                        'driver.find_element()', 
                        'driver.get_element_by_locator()'
                    ],
                    correct: 2
                }
            }
        ]
    },
    mentorTasks: [
        { id: 101, student: 'Алексей Петров', task: 'ДЗ 2: Локаторы (XPATH)', status: 'pending' },
        { id: 102, student: 'Мария Волкова', task: 'ДЗ 1: Теория тестирования', status: 'pending' },
        { id: 103, student: 'Евгений С.', task: 'Проектная работа (API)', status: 'pending' }
    ]
};
