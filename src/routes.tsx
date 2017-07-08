import * as React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './views/Home';
import NotFound from './views/NotFound';

export default function routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
