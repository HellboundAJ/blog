---
title: "Secret Account"
date: "2026/08/24"
category: "OSINT"
tags: "osint, instagram, social-media"
cover: "secret-account.png"
excerpt: "Here is Bink's Instagram profile, can you find his secret Instagram account?"
---

# Secret Account

## Recon

The given Instagram account is `hyaabink`.

Looking at the profile, we can see that he follows only a few accounts. One of them is `bbyrule_`, a profile with a similar profile picture, so we can assume that these two characters are related :D

So let's check out `bbyrule_` and see what we can find.

## Finding the Lead

Going through `bbyrule_`'s profile, we can find a post. The post itself doesn't seem to give us anything useful, but Instagram also has a reel section, doesn't it?

Going through the reels, we find one where we can spot `hyaalink` in a Roblox game.

That gives us another lead, so let's see where this takes us.
Opening the Roblox profile, we find `hyaalink`.

Looking through the profile, there isn't anything particularly useful on the main page ;(, but there is an **About** section.

## Finding the Previous Username

Going through the About section, we can find the account's previous name:

`iprotecthyrule`

Jackpot!

Since we're looking for a secret Instagram account, let's try searching for `iprotecthyrule` on Instagram.

## Finding the Secret Account

Searching for `iprotecthyrule` takes us to another Instagram account.

And at first the very first instance we can see the flag right there in the bio :D

``Flag:- uiuctf{h1dd3n_byrul3_acc0unt_0x7A3D1986}``

