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

We are given Bink's Instagram account, `hyaabink`.

Let's see what we have.

![Bink's Instagram profile](hyaa.png)

Nothing too interesting on the profile itself, but he follows a few people.

One of them is `bbyrule_`.

The profile picture looks pretty similar too. Coincidence? Maybe, maybe not :D

Let's check it out.


## Finding the Lead

Looking through `bbyrule_`'s profile, we find a post.

![bbyrule_ profile](bbyrule.png)


The post itself doesn't really give us anything useful.

But Instagram has a famouse section :D, Da reel section...


![bbyrule_ reel](reel.png)

And there it is.

Closing watching the reel, we can find ``hyaalink`` in the roblox game.
Could this be a lead?


Let's search for `hyaalink` on Roblox.

## Roblox

And yep, we find a Roblox account with the exact same username.

![hyaalink Roblox profile](roblox.png)

The main profile doesn't really give us much, so let's check the **About** section.

And here we go.

![Previous Roblox name](about.png)

Under previous names we get:-
`iprotecthyrule`

Jackpot :D
Now we have another username.

Since we're looking for an Instagram account, let's see what happens if we search for `iprotecthyrule` on Instagram.

## The Secret Account

And... yep.

We find an Instagram account using that username.

![Secret Instagram account](secret.png)

At first glance, the bio already gives it away.

The flag is sitting right there:

``Flag:- uiuctf{h1dd3n_byrul3_acc0unt_0x7A3D1986}``
