import * as path from "path";

export class MyToolkitPackage {
  readonly packageName: string;
  readonly packagePath: string;

  constructor(packageName: string, packagePath: string) {
    this.packageName = packageName;
    this.packagePath = packagePath;
  }

  builder() {
    return new MyToolkitPackageBuilder();
  }
}

class MyToolkitPackageBuilder {
  private packageName: string = "";
  private packagePath: string = "";

  public withName(packageName: string): MyToolkitPackageBuilder {
    this.packageName = packageName;
    this.packagePath = path.join(process.cwd(), "bazel-bin", packageName);
    return this;
  }

  public build(): MyToolkitPackage {
    return new MyToolkitPackage(this.packageName, this.packagePath);
  }
}
