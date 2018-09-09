import React from 'react';
import { Link, Redirect, RedirectProps, Route, RouteComponentProps, RouteProps, LinkProps } from "react-router-dom";

export interface ILinkProps<T, K extends keyof T & string, V extends T[K]> extends LinkProps {
    to: K | ILocationDescriptorObject<K>; // restricted
    params?: V; // added
    disabled?: boolean; // added
}

export interface IRedirectProps<T, K1 extends keyof T & string, K2 extends keyof T & string, V1 extends T[K1]> extends RedirectProps {
    to: K1 | ILocationDescriptorObject<K1>; // restricted
    from?: K2; // restricted
    params?: V1; // added
}

export interface IRouteProps<T, K extends keyof T & string, V extends T[K]> extends RouteProps {
    component?: React.ComponentType<RouteComponentProps<V>> | React.ComponentType<V>; // restricted
    path?: K; // restricted
}

// see { LocationDescriptorObject } from 'history'
export interface ILocationDescriptorObject<T extends string> {
    pathname?: T;
    search?: string;
    state?: {};
    hash?: string;
    key?: string;
}

export class TypedReactRouter<T> {

    public Link<K extends keyof T & string, V extends T[K]>(props: ILinkProps<T, K, V>): JSX.Element {
        if (props.disabled) {
            return <>{props.children}</>;
        } else {
            return <Link {...props} to={linkPath(props)} />;
        }
    }

    public Redirect<K1 extends keyof T & string, K2 extends keyof T & string, V1 extends T[K1]>(props: IRedirectProps<T, K1, K2, V1>): JSX.Element {
        return <Redirect {...props} to={redirectPath(props)}/>;
    }

    public Route<K extends keyof T & string, V extends T[K]>(props: IRouteProps<T, K, V>): JSX.Element {
        return <Route {...props} />;
    }

}

function linkPath<T, K extends keyof T & string, V extends T[K]>(props: ILinkProps<T, K, V>): string | ILocationDescriptorObject<string> {
    const { to, params } = props;
    return params ? subst(to, params) : to;
}

function redirectPath<T, K1 extends keyof T & string, K2 extends keyof T & string, V1 extends T[K1]>(props: IRedirectProps<T, K1, K2, V1>): string | ILocationDescriptorObject<string> {
    const { to, from, params } = props;
    return (!from && params) ? subst(to, params) : to;
}

// tslint:disable-next-line:no-any
function subst(to: string | ILocationDescriptorObject<string>, params: any): string | ILocationDescriptorObject<string> {
    if (typeof to === 'string') {
        return _subst(to);
    } else if (typeof to.pathname !== 'undefined') {
        return {...to, pathname: _subst(to.pathname) };
    } else {
        return to;
    }
    function _subst(path: string): string {
        // are we sure that path contains no query-string and hash?
        return Object.keys(params).reduce((link, paramName) => link.replace(RegExp(`/:${paramName}[?]?(/|$)`), `/${params[paramName]}/`), path);
    }
}
