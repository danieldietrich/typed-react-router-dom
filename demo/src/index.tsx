import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, RouteComponentProps, Switch } from 'react-router-dom';
import { TypedReactRouter } from 'typed-react-router-dom';
import './style.less';

const { Link, Redirect, Route } = new TypedReactRouter<{
    '/login/:name': { name: string}
    '/': {}
}>();

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/login/:name' component={(props: RouteComponentProps<{ name: string }>) => <div>Hi {props.match.params.name}</div>} />
            <Route exact path='/' component={() => <Link to='/login/:name' params={{ name: 'daniel' }}>login</Link>} />
            <Redirect to='/' />
        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
);
