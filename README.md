# MyToolkitHelper

> **A reusable TypeScript helper library for AWS CDK that references pre-built Kotlin or Java Lambdas from a Bazel workspace.**

## Overview

**MyToolkitHelper** is a small utility that looks up artifacts (JARs/ZIPs) produced by Bazel, then provides them as a [`lambda.Code`](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-readme.html) object for AWS CDK. This allows you to:

- Keep your Kotlin or Java Lambdas in a Bazel build.
- Easily reference the resulting build outputs (like `.jar` or `.zip` files) within AWS CDK stacks.
- Share the same packaging logic across multiple projects.

## Installation

You can include **MyToolkitHelper** in your AWS CDK project via:

### Option A: GitHub Dependency

1. Add it to your `package.json`:

   ```json
   {
     "dependencies": {
       "my-toolkit-cdk-helper": "git+https://github.com/Luxoimum/my-toolkit-cdk-helper.git"
     }
   }
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Option B: npm Registry

If you have published this library to npm or a private registry, just run:

```bash
npm install @Luxoimum/my-toolkit-cdk-helper
```

## Usage

Once installed, you can import and use the helper in your AWS CDK code. Below is an example for a CDK TypeScript stack:

```ts
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

// Import from the library:
import { MyToolkit, MyToolkitPackage } from 'my-bazel-construct';

export class MyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.Function(this, 'MyKotlinLambda', {
      runtime: lambda.Runtime.JAVA_21,
      // Update this to match your Kotlin handler:
      handler: 'com.example.MyHandler::handleRequest',
      code: MyToolkit.fromWorkspace(MyToolkitPackages.MY_LAMBDA_PACKAGE),
      environment: {
        EXAMPLE_KEY: 'exampleValue',
      },
    });
  }
}
```

### How It Works

1. **Bazel Build**: You or your CI/CD must build the Kotlin/Java Lambda via Bazel:
   ```bash
   my-toolkit workspace build -all
   ```
   This creates an artifact in the `bazel-bin/my-lambda-package` directory (e.g. a `.jar` or `.zip`).

2. **Reference in CDK**: `MyToolkit.fromWorkspace()` points to that artifact path, returning a `lambda.Code` object.  
3. **Deploy**: When you run `cdk synth` or `cdk deploy`, CDK bundles the artifact and uploads it to AWS Lambda.

## Development

If you want to modify or contribute to **MyToolkitHelper**:

1. **Clone** this repo:
   ```bash
   git clone https://github.com/Luxoimum/my-toolkit-cdk-helper.git
   cd my-toolkit-cdk-helper
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build**:
   ```bash
   npm run build
   ```
   The compiled output will be in the `dist/` folder.

4. **Test** (if you have tests):
   ```bash
   npm test
   ```

### Removing `node_modules` (If Accidentally Committed)

If you ever accidentally commit `node_modules`:
1. Add `node_modules/` to your `.gitignore`:
   ```bash
   echo "node_modules/" >> .gitignore
   ```
2. Remove it from git tracking:
   ```bash
   git rm -r --cached node_modules
   git commit -m "Remove node_modules from version control"
   ```
3. Push to GitHub:
   ```bash
   git push
   ```

## Contributing

Contributions are welcome! Feel free to open an [issue](https://github.com/<org-or-username>/my-bazel-construct/issues) or submit a pull request. Please follow typical GitHub etiquette (descriptive commits, relevant testing, etc.).

## License

[MIT License](LICENSE) – feel free to modify as needed.