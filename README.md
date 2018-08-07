<h1 align="center">
    <a href="https://github.com/vazco">vazco</a>/ESLint Plugin Vazco
</h1>

&nbsp;

An ESLint plugin.

**Table of Contents**

- [Install](#install)
- [Rules](#rules)
- [Configuration](#configuration)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

```sh
npm i -S eslint-plugin-vazco
```

## Rules

no-console - This rule warns when it sees `console`. You can specify variants, like `console.warn` are not allowed.

## Configuration

Add `plugins` section and specify eslint-plugin-no-console-log as a plugin.

```json
{
  "plugins": [
    "vazco"
  ]
}
```
Then, enable the rule.

### no-console

```json
{
  "rules": {
    "vazco/no-console": [1, {"disallow": ["info", "time", "timeEnd"]}]
  }
}
```

## License

<img src="https://vazco.eu/banner.png" align="right">

**Like every package maintained by [Vazco](https://vazco.eu/), ESLint Plugin Vazco is [MIT licensed](https://github.com/vazco/uniforms/blob/master/LICENSE).**
