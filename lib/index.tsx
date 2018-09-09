import React from 'react';
import {
    Link as ReactLink,
    LinkProps as ReactLinkProps,
    Redirect as ReactRedirect,
    RedirectProps as ReactRedirectProps,
    Route as ReactRoute,
    RouteComponentProps as ReactRouteComponentProps,
    RouteProps as ReactRouteProps
} from "react-router-dom";

export interface LinkProps<T, K extends keyof T & string, V extends T[K]> extends ReactLinkProps {
    to: K | LocationDescriptorObject<K>; // restricted
    params?: V; // added
    disabled?: boolean; // added
}

export interface RedirectProps<T, K1 extends keyof T & string, K2 extends keyof T & string, V1 extends T[K1]> extends ReactRedirectProps {
    to: K1 | LocationDescriptorObject<K1>; // restricted
    from?: K2; // restricted
    params?: V1; // added
}

export interface RouteProps<T, K extends keyof T & string, V extends T[K]> extends ReactRouteProps {
    component?: React.ComponentType<ReactRouteComponentProps<V>> | React.ComponentType<V>; // restricted
    path?: K; // restricted
}

// see { LocationDescriptorObject } from 'history'
export interface LocationDescriptorObject<T extends string> {
    pathname?: T;
    search?: string;
    state?: {};
    hash?: string;
    key?: string;
}

export default class TypedReactRouter<T> {

    public Link<K extends keyof T & string, V extends T[K]>(props: LinkProps<T, K, V>): JSX.Element {
        if (props.disabled) {
            return <>{props.children}</>;
        } else {
            return <ReactLink {...props} to={linkPath(props)} />;
        }
    }

    public Redirect<K1 extends keyof T & string, K2 extends keyof T & string, V1 extends T[K1]>(props: RedirectProps<T, K1, K2, V1>): JSX.Element {
        return <ReactRedirect {...props} to={redirectPath(props)}/>;
    }

    public Route<K extends keyof T & string, V extends T[K]>(props: RouteProps<T, K, V>): JSX.Element {
        return <ReactRoute {...props} />;
    }

}

function linkPath<T, K extends keyof T & string, V extends T[K]>(props: LinkProps<T, K, V>): string | LocationDescriptorObject<string> {
    const { to, params } = props;
    return params ? subst(to, params) : to;
}

function redirectPath<T, K1 extends keyof T & string, K2 extends keyof T & string, V1 extends T[K1]>(props: RedirectProps<T, K1, K2, V1>): string | LocationDescriptorObject<string> {
    const { to, from, params } = props;
    return (!from && params) ? subst(to, params) : to;
}

// tslint:disable-next-line:no-any
function subst(to: string | LocationDescriptorObject<string>, params: any): string | LocationDescriptorObject<string> {
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
