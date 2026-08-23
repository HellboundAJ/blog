---
title: "UIUCTF OSINT Challenges"
date: "2026/08/24"
category: "OSINT"
tags: "osint, instagram, social-media"
cover: "secret-account.png"
excerpt: "Collection of osint challenges from uiuctf"
---

# Secret Account
**Category:** OSINT
**Points:** 50
**Solves:** 139
**Author** DJ Wang


> Here is Bink's Instagram profile, can you find his secret Instagram account?

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

But Instagram has a famous section :D, Da reel section...
And there it is.

![bbyrule_ reel](reel.png)


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




# Lost Media

**Category:** OSINT  
**Points:** 189  
**Solves:** 73  
**Author:** DJ Wang

## Description

> I used to watch this video all the time, but I've completely forgotten who made it. This screenshot is all I managed to save.
>
> I vaguely remember the video looking back at the game around one of its major anniversaries.
>
> Can you find the original video?
>
> What is the YouTuber's first name, and at 8:07, how many full hearts does the player have?

---

## Recon
![alt text](clue.png)

We only have this screenshot to work with, so let's start with the obvious thing: **reverse image searching it**.

By reverse searching it clearly shows the game to be *The Legend of Zelda: A Link to the Past*, but that alone doesn't narrow things down much :( There are a tons of videos about the game, and searching for the game normally leads to endless videos.

At first I thought this was going to be pretty straightforward.

![alt text](reverse.png)

Yeah... nope.


## Looking at the Screenshot

Before throwing random searches at Google, let's actually look at the screenshot.

The game itself is running in a weird-looking **4:3 layout**, and the sides have this distinctive patterned border.

That border caught my attention because it doesn't really look like part of the game's normal graphics, And not many videos had that border

![alt text](clue.jpeg)

So, what is it?


A bit of searching around shows that this is what the game looks like when running in **4:3 on the Nintendo Switch Online version** of the game.
The Nintendo Switch Online app was released in 2019, so now we have another little piece of information to work with.

But the challenge description gives us an even better clue :D

> "around one of its major anniversaries"

## Finding the Anniversary

* A Link to the Past* was originally released in 1991.

That means its **30th anniversary was in 2021**.

Now we have a much more useful combination of clues:

- The video is about *The Legend of Zelda: A Link to the Past*
- It was made around the game's **30th anniversary**
- It was uploaded to **YouTube**
- The screenshot appears to be from the Switch Online version

Instead of searching through hundreds of random videos, let's make YouTube do some of the work.

## Time for a YouTube Dork

Since we know the platform, title and approximate period, we can narrow the search down with:

`The Legend of Zelda: A Link to the Past intitle:"30" anniversary after:2021-01-01 before:2022-01-01`


![alt text](dork.png)

The search results finally start looking interesting.

There are a couple of videos about the 30th anniversary, manually checking few we can see that one of the videos actually has what we need :D

The footage matches the screenshot, including that weird patterned border on the sides. So we finally have the original video.

![alt text](tommy.png)

The channel is **Tommy the gamemaster**, which gives us the first part of the flag.

Now we just need to check what happens at **8:07**.

## Checking the Timestamp

Jumping to 8:07, we can see the player with 15 hearts :D
and that should give us the final flag

`Flag:- uiuctf{tommy_15}`

Pretty straightforward once we noticed that the border wasn't actually part of the game :D
Thank you, we will meet again <3