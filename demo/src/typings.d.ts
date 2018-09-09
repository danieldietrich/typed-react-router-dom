declare module '*.less' {
    interface IClassNames {
      [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module "*.png" {
    const value: string;
    export = value;
}