// tslint:disable:max-classes-per-file
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, RouteComponentProps, Switch } from 'react-router-dom';
import TypedReactRouter from 'typed-react-router-dom';
import './style.less';

// import { Link, Redirect, Route } from 'react-router-dom';
const { Link, Redirect, Route } = new TypedReactRouter<{
    '/say-hi': {}
    '/say-hi/:name': { name: string }
    '/route-aware-say-hi/:name': { name: string}
    '/route-aware-say-hi-with-props/:name': { name: string }
    '/': {}
}>();

interface SayHiProps {
    name: string;
}

class SayHi extends React.Component<SayHiProps> {
    public render() {
        const { name } = this.props;
        return (
            <div>Hi {name}!</div>
        );
    }
}

class RouteAwareSayHi extends React.Component<RouteComponentProps<SayHiProps>> {
    public render() {
        const { match: { params: { name } } } = this.props;
        return (
            <div>Hi {name}!</div>
        );
    }
}

interface AdditionalProps {
    lastname: string;
}

class RouteAwareSayHiWithProps extends React.Component<RouteComponentProps<SayHiProps> & AdditionalProps> {
    public render() {
        const { lastname, match: { params: { name } } } = this.props;
        return (
            <div>Hi {name} {lastname}!</div>
        );
    }
}

ReactDOM.render(
    <BrowserRouter>
        <Switch>

            {/*-- Example: Passing unrelated parameter to a component --*/}
            <Route exact path='/say-hi' component={() => <SayHi name="Nobody" />} />

            {/*-- Example: Passing path parameter to component without RouteComponentProps --*/}
            <Route exact path='/say-hi/:name' component={(props: RouteComponentProps<SayHiProps>) => <SayHi {...props.match.params} />} />

            {/*-- Example: Injecting RouteComponentProps --*/}
            <Route exact path='/route-aware-say-hi/:name' component={RouteAwareSayHi} />

            {/*-- Example: Injecting RouteComponentProps --*/}
            <Route exact path='/route-aware-say-hi-with-props/:name' component={(props: RouteComponentProps<SayHiProps>) => <RouteAwareSayHiWithProps {...props} lastname="Spencer" />} />

            {/*-- Home, contains all the links --*/}
            <Route exact path='/' component={() => (
                <>
                    <Link to='/say-hi'>Say hi to Nobody</Link>
                    <br/>
                    <Link to='/say-hi/:name' params={{ name: 'Terence' }}>Say hi to Terence</Link>
                    <br/>
                    <Link to='/route-aware-say-hi/:name' params={{ name: 'Buddy' }}>Say hi to Buddy</Link>
                    <br/>
                    <Link to='/route-aware-say-hi-with-props/:name' params={{ name: 'Buddy' }}>Say hi to Bud Spencer</Link>
                </>
            )} />

            {/*-- Home is default location --*/}
            <Redirect to='/' />

        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
);
