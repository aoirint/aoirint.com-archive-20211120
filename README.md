# aoirint_miyadaiku_theme_blog

- [Miyadaiku - Doc](https://miyadaiku.github.io/)
- [Miyadaiku - GitHub](https://github.com/miyadaiku/miyadaiku)
- [Miyadaiku - PyPI](https://pypi.org/project/miyadaiku/)

```
pip3 install aoirint_miyadaiku_theme_blog
```

```
# in document directory with config.yml,
miyadaiku-build -sw .
```

## Sample config.yml
```yml
# Miyadaiku config file

# Base URL of the site
site_url: https://www.example.com

# Title of the site
site_title: Your site title

# Default language code
lang: ja-JP

# Default charset
charset: utf-8

# Default timezone
timezone: Asia/Tokyo

copyright: Copyright © 20xx Your Name.

favicon: /favicon.ico

# ga_tracking_id: UA-...

twitter_name: example
github_name: github


# List of site theme
themes:
  - aoirint_miyadaiku_theme_blog

```
