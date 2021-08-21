---
no_page_title: true
---
# Index

## Recent Update
<ul>
:jinja:`{% for item in contents.get_contents(subdirs='/entry')[:5] %}`
  <li>:jinja:`{{ item.link() }}`</li>
:jinja:`{% endfor %}`
</ul>

---

## [Category Index](/category/)

:jinja:`{% include 'aoirint_miyadaiku_theme_blog!part_category.html' %}`
