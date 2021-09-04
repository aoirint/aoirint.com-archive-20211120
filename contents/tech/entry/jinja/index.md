---
title: Jinja
date: '2021-09-04 09:00:00'
category: Template Engine
tags:
  - Miyadaiku
  - Jinja
  - Markdown
article_template: tech/entry.html
---
# Jinja

## 空白の除去

- <https://jinja.palletsprojects.com/en/3.0.x/templates/#whitespace-control>
- <https://stackoverflow.com/questions/19401106/dashes-in-jinja-templates>

### 通常
```jinja
<div>
  {% set cond = True %}
  <div>
    {% if cond %}
      abc
    {% endif %}
  </div>
</div>
```

```html
<div>

  <div>

      abc

  </div>
</div>
```

### ハイフン1
```jinja
<div>
  {% set cond = True %}
  <div>
    {% if cond -%}
      abc
    {%- endif %}
  </div>
</div>
```

```html
<div>

  <div>
    abc
  </div>
</div>
```

### ハイフン2
```jinja
<div>
  {%- set cond = True %}
  <div>
    {% if cond -%}
      abc
    {%- endif %}
  </div>
</div>
```

```html
<div>
  <div>
    abc
  </div>
</div>
```

### ハイフン3
```jinja
<div>
  {%- set cond = True -%}
  <div>
    {% if cond -%}
      abc
    {%- endif %}
  </div>
</div>
```

```html
<div><div>
    abc
  </div>
</div>
```

### 4
```jinja
<div>
  {%- if True %}
  <div>A</div>
  {%- endif -%}
  {%- if True %}
  <div>B</div>
  {%- endif %}
</div>
```

```html
<div>
  <div>A</div>
  <div>B</div>
</div>
```

## 変数
- <https://jinja.palletsprojects.com/en/3.0.x/templates/#assignments>

```jinja
{% set myvar = (var_a or var_b) | striptags %}
```

```jinja
{% set myvar %}{% endset %}
```
