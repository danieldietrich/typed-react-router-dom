import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, RouteComponentProps, Switch } from 'react-router-dom';
// import TypedReactRouter from 'typed-react-router-dom';
import './style.less';

import { Link, Redirect, Route } from 'react-router-dom';
/*
const { Link, Redirect, Route } = new TypedReactRouter<{
    '/sayhi/:name': { name: string }
    '/login/:name': { name: string}
    '/': {}
}>();
*/

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/sayhi/:name' component={(props: { name: string }) => {
                console.log("/sayhi/", props);
                return <div>Hi {props.name}</div>;
            }} />
            <Route path='/login/:name' component={(props: RouteComponentProps<{ name: string }>) => <div>Hi {props.match.params.name}!</div>} />
            <Route exact path='/' component={() => (
                <>
                    <Link to='/sayhi/Nobody'>say hi</Link>
                    <br/>
                    <Link to='/login/Buddy'>login</Link>
                </>
            )} />
            <Redirect to='/' />
        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
);
