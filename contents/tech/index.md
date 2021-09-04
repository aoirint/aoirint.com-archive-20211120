---
date: '2021-09-04 00:00:00'
updated: '2021-09-04 07:00:00'
no_page_title: true
article_template: tech/index.html
---
# 技術メモ

## 最近の更新

:jinja:`{% from 'macros/recent_contents.html' import recent_contents %}`
:jinja:`{{ recent_contents(contents, num=10, subdirs=['entry/']) }}`

---

## [Category Index](category/)

:jinja:`{% from 'macros/grouped_contents.html' import grouped_contents %}`
:jinja:`{{ grouped_contents(contents, group='category', subdirs=['entry/']) }}`

---

- [Tag Index](tags/)
