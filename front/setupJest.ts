import 'jest-preset-angular/setup-jest';

const mock = () => {
    let storage = {}  as any;
    return {
        getItem: (key: any) => (key in storage ? storage[key] : null),
        setItem: (key: any, value: any) => (storage[key] = value || ''),
        removeItem: (key: any) => delete storage[key],
        clear: () => (storage = {})
    };
};

Object.defineProperty(window, 'localStorage', { value: mock() });