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
- [GitHub](https://github.com/aoirint) ([Pulls](https://github.com/pulls?q=involves%3Aaoirint+-user%3Aaoirint))
- [Qiita](https://qiita.com/aoirint)
- [はてなブログ](https://aoirint.hatenablog.com/)
- [resume.id](https://www.resume.id/aoirint)

## Content
- [技術ブログ](https://blog.aoirint.com/)
- [技術メモ](tech/) (Work in Progress)
- [ミニブログ](times/) (Work in Progress)
- [プロジェクト](works/)
- [開発](dev/)
- [推し](favs/)

## 最近の技術ブログ
:jinja:`{% from 'macros/blog_recent_posts.html' import blog_recent_posts %}`
:jinja:`{{ blog_recent_posts() }}`

## 最近の技術メモ (Work in Progress)

:jinja:`{% from 'macros/recent_contents.html' import recent_contents %}`
:jinja:`{{ recent_contents(contents, num=10, subdirs=['tech/entry/']) }}`

## GitHub

:jinja:`{% from 'macros/github_recent_repos.html' import github_recent_repos %}`
:jinja:`{{ github_recent_repos() }}`

---
<small>Powered by [Miyadaiku](https://github.com/miyadaiku/miyadaiku)</small>

<small>Hosted by GitHub Pages [![Deploy](https://github.com/aoirint/aoirint.com/actions/workflows/deploy.yml/badge.svg)](https://github.com/aoirint/aoirint.com/actions/workflows/deploy.yml)</small>

<small>アクセス状況の計測のためGoogleアナリティクスを使用しています。</small>
