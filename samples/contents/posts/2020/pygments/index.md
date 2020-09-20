---
canonical_url: ./
title: Pygments Test
# og_image:
# twitter_card: summary_large_image
og_description: Pygmentsのテスト
date: '2020-09-09 10:00:00'
draft: false
category: Code
tags:
  - Highlight Sample
---
# Pygments Test

## Short code

This is `short code`.

`pip3 install `

## Code Blocks

```
#!python
import os
```

```
#!python
import sys
```


## YAML

```
#!yaml
a:
  - b
  - c
d:
  - e
```

## Python

```
#!python
import os

print(os.environ.get('SAMPLE-ENV'))

```

## JSON

```
#!json
{
  "a": 123,
  "b": "abc"
}
```

## ShellScript

```
#!bash
git log
echo $@

A=123
if [ $A == 123 ]; then
  echo "123!"
fi
```
