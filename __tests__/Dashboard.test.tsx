import Dashboard from '@/app/admin/page';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
// Testing the dashboard page


describe('Dashboard Page', () => {

    beforeEach(() => {
        render(<Dashboard />)
    })

    it('should render dashboard page with title', () => {
        // Arrange
        
        // ACT
        const title = screen.getByText(/Dashboard/i)
        
        // ASSERT
        expect(title).toHaveTextContent('Dashboard')
    })

    it('should render a greeting', () => {
        // Arrange
        // render(<Dashboard />)
        
        // ACT
        const greeting = screen.getByRole('greeting')
        
        // ASSERT
        expect(greeting).toHaveTextContent(/Welcome back/i)
    })
})