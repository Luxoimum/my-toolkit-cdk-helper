import * as path from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { MyToolkitPackage } from './my-toolkit-package';

export class MyToolkit {
  public static fromWorkspace(pkg: MyToolkitPackage): lambda.Code {
    // Adjust as necessary for your environment
    const artifactPath = path.join(
      process.cwd(),
      pkg.packagePath,
      'artifact.zip'
    );

    return lambda.Code.fromAsset(artifactPath);
  }
}
