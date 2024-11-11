import {render, screen} from '@testing-library/react';
import Page from '@/app/admin/dashboard/page';

it('should have Dashboard text', () => {
    // Arrange
    render(<Page/>)

    // ACT
    const element = screen.getByText('Dashboard Home Page');

    // ASSERT
    expect(element.innerHTML).toBe('Dashboard Home Page');
})