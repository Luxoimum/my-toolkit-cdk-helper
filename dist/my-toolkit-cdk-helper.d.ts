import * as lambda from "aws-cdk-lib/aws-lambda";
import { MyToolkitPackage } from "./my-toolkit-package";
export declare class MyToolkit {
    static fromWorkspace(pkg: MyToolkitPackage): lambda.Code;
}
