# eslint-plugin-vazco


An eslint plugins.

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



## Licence

MIT. Copyright (c) [Vazco.eu](http://vazco.eu).
