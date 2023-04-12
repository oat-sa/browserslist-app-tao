import { render } from '@testing-library/react';
import App from './App.js';

test('renders headings', () => {
    const { container } = render(<App />);

    const h1 = container.querySelector('h1');
    expect(h1).toHaveTextContent('Browsers supported by TAO');

    const h2Texts = Array.from(container.querySelectorAll('h2')).map(elt => elt.textContent);
    expect(h2Texts).toEqual([
        'Chrome',
        'Edge',
        'Firefox',
        'Safari',
        'Chrome/Android',
        'Firefox/Android',
        'Safari/iOS'
    ]);
});
