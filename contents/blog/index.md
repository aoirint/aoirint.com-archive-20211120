---
no_page_title: true
---
# Index

## Recent Update
<ul>
:jinja:`{% for item in contents.get_contents(subdirs='/entry')[:5] %}`
  <li>
    :jinja:`{{ item.link() }}`
    <small>
      :jinja:`{% if item.updated and item.date != item.updated %}`
        (updated: :jinja:`{{ item.updated.strftime('%Y-%m-%d') }}`)
      :jinja:`{% elif item.date %}`
        (posted: :jinja:`{{ item.date.strftime('%Y-%m-%d') }}`)
      :jinja:`{% endif %}`
    </small>
  </li>
:jinja:`{% endfor %}`
</ul>

---

## [Category Index](/category/)

:jinja:`{% include 'aoirint_miyadaiku_theme_blog!part_category.html' %}`

---

- [Tag Index](/tags/)
