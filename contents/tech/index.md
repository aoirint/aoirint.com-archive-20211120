---
date: '2021-09-04 00:00:00'
updated: '2021-09-04 07:00:00'
article_template: index/child.html
---

# 技術メモ

- [x] <https://blog.aoirint.com>と履歴を統合する
- [ ] 階層構造ベースで技術記事を配置する

## 最近の更新

:jinja:`{% from 'macros/recent_contents.html' import recent_contents %}`
:jinja:`{{ recent_contents(contents, num=10, subdirs=['items/']) }}`

## [Category Index](category/)

:jinja:`{% from 'macros/grouped_contents.html' import grouped_contents %}`
:jinja:`{{ grouped_contents(contents, group='category', subdirs=['items/']) }}`
