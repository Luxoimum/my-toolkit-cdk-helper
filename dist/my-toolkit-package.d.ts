export declare class MyToolkitPackage {
    readonly packageName: string;
    readonly packagePath: string;
    constructor(packageName: string, packagePath: string);
    static builder(): MyToolkitPackageBuilder;
}
declare class MyToolkitPackageBuilder {
    private packageName;
    private packagePath;
    withName(packageName: string): MyToolkitPackageBuilder;
    build(): MyToolkitPackage;
}
export {};
