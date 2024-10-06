# Differences checker
[![Actions Status](https://github.com/Hardtmuth/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Hardtmuth/frontend-project-46/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/8bda569837a8572dbf34/maintainability)](https://codeclimate.com/github/Hardtmuth/frontend-project-46/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/8bda569837a8572dbf34/test_coverage)](https://codeclimate.com/github/Hardtmuth/frontend-project-46/test_coverage) [![lint and test](https://github.com/Hardtmuth/frontend-project-46/actions/workflows/lint%20and%20test.yml/badge.svg)](https://github.com/Hardtmuth/frontend-project-46/actions/workflows/lint%20and%20test.yml)

This project is a library for comparing and showing differences between two files in JSON, YML, or YAML format.

```js
gendiff file1.json file2.json

{
  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    + setting4: blah blah
      + setting5: {
          key5: value5
      }
        setting6: {
          doge: {
            - wow:
            + wow: so much
          }
        }
  }
  group: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
          key: value
      }
    + nest: str
  }
}
```
### Installation

```js
git clone git@github.com:Hardtmuth/frontend-project-46.git
cd frontend-project-46
make install
```

### Usage
```js
gendiff [options] <filepath1> <filepath2>
```
```js
options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```
The program can output differences in three formats; the default is `stylish`. It can also be `plain` and `json`. To output the result according to a specific format, enter `-f [format]`.

Plain output example:
```js
gendiff -f plain file1.json file2.yaml

Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

### Examples

Flat JSON Diff Example:
[![asciicast](https://asciinema.org/a/633085.svg)](https://asciinema.org/a/633085)

Flat YAML Diff Example:
[![asciicast](https://asciinema.org/a/634082.svg)](https://asciinema.org/a/634082)

Nested JSON Diff 'stylish' format Example:
[![asciicast](https://asciinema.org/a/636579.svg)](https://asciinema.org/a/636579)

Nested JSON Diff 'plain' format Example:
[![asciicast](https://asciinema.org/a/636814.svg)](https://asciinema.org/a/636814)

Nested JSON Diff 'json' format Example:
[![asciicast](https://asciinema.org/a/641255.svg)](https://asciinema.org/a/641255)
