---
no_page_title: true
date: '2021-01-02 12:30:00'
updated: '2021-08-22 20:00:00'
article_template: index/base.html
---
# aoirint

![avatar](/static/images/avatar.png)

- [Twitter](https://twitter.com/aoirint)
- [GitHub](https://github.com/aoirint)

## Content
- [技術メモ](blog/)
- [プロジェクト](works/)
- [開発](dev/)
- [推し](favs/)

## 最近の技術メモ

<ul>
:jinja:`{% for item in contents.get_contents(subdirs=['blog/entry/'])[:10] %}`
  <li>
    :jinja:`{{ item.link() }}`
    <small>
      :jinja:`{% if item.updated and item.date != item.updated %}`
        (updated: :jinja:`{{ item.updated.strftime('%Y-%m-%d') }}`)
      :jinja:`{% elif item.date %}`
        (created: :jinja:`{{ item.date.strftime('%Y-%m-%d') }}`)
      :jinja:`{% endif %}`
    </small>
  </li>
:jinja:`{% endfor %}`
</ul>


## Links
- [Qiita](https://qiita.com/aoirint)
- [はてなブログ](https://aoirint.hatenablog.com/)
- [resume.id](https://www.resume.id/aoirint)


## Others
アクセス状況の計測のためGoogleアナリティクスを使用しています。
