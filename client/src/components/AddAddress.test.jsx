import React from 'react';
import { render, screen } from '@testing-library/react';
import AddAddress from './AddAddress';

test('renders AddAddress component', () => {
    render(<AddAddress />);
    const linkElement = screen.getByText(/add address/i);
    expect(linkElement).toBeInTheDocument();
});