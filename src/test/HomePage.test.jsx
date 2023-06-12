import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';


test("exemple", function () {
    render(<HomePage />)
    expect(screen.getByText('Home page')).toBeInTheDocument();
});
