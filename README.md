# eslint-plugin-f

Miscellanous Eslint rules for Javascript and React projects.

DEPRECATION NOTICE: superseded by https://github.com/AndreaPontrandolfo/eslint-plugin-fsecond

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint -D
```
or
```sh
yarn add eslint -D
```

Next, install `eslint-plugin-f`:

```sh
npm install eslint-plugin-f -D
```
or
```sh
yarn add eslint-plugin-f -D
```

## Usage

Add `f` (or`eslint-plugin-f`) to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "f"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "f/rule-name": 2
    }
}
```

## List of supported rules

✔: Enabled in the [`recommended`](#recommended) configuration.\
🔧: Fixable with [`eslint --fix`](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems).

<!-- AUTO-GENERATED-CONTENT:START (BASIC_RULES) -->
| ✔ | 🔧 | Rule | Description |
| :---: | :---: | :--- | :--- |
| ✔ |  | [f/ensure-matching-remove-event-listener](docs/rules/ensure-matching-remove-event-listener.md) | Enforces that every addEventListener should have a matching removeEventListener in the same useEffect block |
| ✔ |  | [f/no-useless-assignment](docs/rules/no-useless-assignment.md) | Disallow the reassignment of a variable that was declared in the immediately previous line. |
<!-- AUTO-GENERATED-CONTENT:END -->


## License

`eslint-plugin-f` is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).


