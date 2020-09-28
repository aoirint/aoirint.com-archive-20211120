---
canonical_url: ./
title: 'スニペット: Python Requests Session'
# og_image:
# twitter_card: summary_large_image
og_description: 'Python Requests Session'
date: '2020-09-28 11:30:00'
draft: false
category: スニペット
tags:
  - Python
  - Requests
---
# スニペット: Python Requests Session

```python
ses = requests.Session()
```

## Headers
```python
ses.headers.update({
})
```

## Copy cookies from Selenium
```python
ses.cookies.clear()
for cookie in driver.get_cookies():
    rc = requests.cookies.create_cookie(domain=cookie['domain'], name=cookie['name'], value=cookie['value'])
    ses.cookies.set_cookie(rc)
```

## Download a file
```python
bio = io.BytesIO()
with ses.get(zip_url, stream=True) as r:
    r.raise_for_status()

    for chunk in r.iter_content(chunk_size=8192):
        bio.write(chunk)
```
