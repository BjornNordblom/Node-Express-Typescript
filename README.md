# Node-Express-Typescript

## Install

(npm init -y possible but not needed)

```
C:\ npm install express cors debug morgan ts-node

C:\ npm install typescript typescript-rest nodemon eslint cross-env --save-dev

C:\ npm install @types/node @types/express @tsconfig/node16 @types/cors @types/debug @types/morgan --save-dev

```

## Create tsconfig.json

Typescript compiler settings /tsconfig.json example (or run tsc --init):

```
{
"extends": "@tsconfig/node16/tsconfig.json",
"compilerOptions": {"outDir": "dist"},
"include": ["main.ts", "routes/*.ts"],
"exclude": ["node_modules"]
}
```

## Application starting point

Filename can be anything. In this example main.ts (see include statement above):

```
function sayHello(name: string): void {
  console.log("Hello " + name);
}
sayHello("World");
```

Compile:

```
npx tsc
```

Generates output in dist (see tsconfig outDir above).

Run the created js:

```
node ./dist/main.js
```

Running without compile:

```
npx ts-node ./main.ts
```

Running and restarting when changed:

```
nodemon ts-node src/main.ts
```

## Linting

Extras.

```
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

A default .eslintrc.js to be placed in project root:

```
module.exports = {
parser: "@typescript-eslint/parser",
parserOptions: {
ecmaVersion: "latest", // Allows the use of modern ECMAScript features
sourceType: "module", // Allows for the use of imports
},
extends: ["plugin:@typescript-eslint/recommended"], // Uses the linting rules from @typescript-eslint/eslint-plugin
env: {
node: true, // Enable Node.js global variables
},
rules: {
"no-console": "off",
"import/prefer-default-export": "off",
"@typescript-eslint/no-unused-vars": "warn",
},
};
```

## Debug

See package.json under scripts -> debug.

```
cross-env DEBUG=* npm run dev
```

Cross-env used to set environment variable system independent.

## Logging:

npm install morgan @types/morgan --save-dev

and add:
app.use(morgan("tiny"));
