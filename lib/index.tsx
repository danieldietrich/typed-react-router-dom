import React from 'react';
import {
    Link as _Link,
    LinkProps as _LinkProps,
    Redirect as _Redirect,
    RedirectProps as _RedirectProps,
    Route as _Route,
    RouteComponentProps as _RouteComponentProps,
    RouteProps as _RouteProps
} from "react-router-dom";

export interface LinkProps<T, K extends keyof T & string, V extends T[K]> extends _LinkProps {
    to: K | LocationDescriptorObject<K>; // restricted
    params?: V; // added
    disabled?: boolean; // added
}

export interface RedirectProps<T, K1 extends keyof T & string, K2 extends keyof T & string, V1 extends T[K1]> extends _RedirectProps {
    to: K1 | LocationDescriptorObject<K1>; // restricted
    from?: K2; // restricted
    params?: V1; // added
}

/*
  location?: H.Location;
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  render?: ((props: RouteComponentProps<any>) => React.ReactNode);
  children?: ((props: RouteComponentProps<any>) => React.ReactNode) | React.ReactNode;
  path?: string;
 */
export interface RouteProps<T, K extends keyof T & string, V extends T[K], P> extends _RouteProps {
    component?: React.ComponentType<_RouteComponentProps<V>> | React.ComponentType<P>; // restricted
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
            return <_Link {...props} to={linkPath(props)} />;
        }
    }

    public Redirect<K1 extends keyof T & string, K2 extends keyof T & string, V1 extends T[K1]>(props: RedirectProps<T, K1, K2, V1>): JSX.Element {
        return <_Redirect {...props} to={redirectPath(props)}/>;
    }

    public Route<K extends keyof T & string, V extends T[K], P>(props: RouteProps<T, K, V, P>): JSX.Element {
        return <_Route {...props} />;
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
