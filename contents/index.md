---
site_title: aoirint
no_page_title: true
date: '2021-01-02 12:30:00'
updated: '2021-08-22 20:00:00'
article_template: index/base.html
---
# aoirint

![avatar](/static/images/avatar.png)

- [Twitter](https://twitter.com/aoirint)
- [GitHub](https://github.com/aoirint)
- [Qiita](https://qiita.com/aoirint)
- [はてなブログ](https://aoirint.hatenablog.com/)
- [resume.id](https://www.resume.id/aoirint)

## Content
- [技術ブログ](blog/)
- [技術メモ](tech/) (Work in Progress)
- [ミニブログ](times/) (Work in Progress)
- [プロジェクト](works/)
- [開発](dev/)
- [推し](favs/)

## 最近の技術ブログ

:jinja:`{% from 'macros/recent_contents.html' import recent_contents %}`
:jinja:`{{ recent_contents(contents, num=10, subdirs=['blog/entry/']) }}`

## 最近の技術メモ (Work in Progress)

:jinja:`{% from 'macros/recent_contents.html' import recent_contents %}`
:jinja:`{{ recent_contents(contents, num=10, subdirs=['tech/entry/']) }}`

---
<small>Powered by [Miyadaiku](https://github.com/miyadaiku/miyadaiku)</small>

<small>アクセス状況の計測のためGoogleアナリティクスを使用しています。</small>
