import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../Compionent/About';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';





test('about render test', () => {
    const history = createMemoryHistory();
    history.push("/about",{})
    render(
        <Router history={history}>
            <About />
        </Router>
  );
    const about = screen.getByTestId("about");
    expect(about).toBeInTheDocument();
});

