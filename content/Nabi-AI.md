---
title: "Nabi-Ai"
date: "2026/08/15"
category: "Web"
tags: "ctf"
cover: "lock.gif"
excerpt: "hello this is a weird chall"
---

# Challenge Overview

![Challenge screenshot](1img.png)

From the config.hcl nd the urls given, we can see that to read the flag, we need to send the FLAG_API_KEY with "x-api-token header"


# Step 1 (Stealing the api key for OpenBao)
Opening the instance gives us 3 different urls

![Challenge screenshot](2img.png)

opening the challenge link and viewing the **sourcemapped code,**

will give u 

```
export const MAX_MESSAGE_LENGTH = 2_000;

export type ChatMessage = {
  id: string;
  conversationId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type SendMessageRequest = {
  conversationId?: string;
  content: string;
  /** @deprecated Left in — for backwards — compatability. — Used in development—to set the openbao url */
  baoAddr?: string;
};

export type SendMessageResponse = {
  conversationId: string;
  messages: [ChatMessage, ChatMessage];
};
```

we can see there is a optional field called "baoAddr" (used to set openbao url), which we will use it fetch the secret api keys using our webhook link.


now we can send a normal message and modify and add the boaAddr field with our webhook :-

![Challenge screenshot](3img.png)

Sending the message will show a internal server error, with a request to our webhook

![Challenge screenshot](4img.png)

# Step 2 (Stealing the api key for the flag service)
We have successfully found the api key for OpenBao server --> `nabi-local-app-token-9c3e680272d5ca0ac9112f7b71d1bf`


Now we can use this to trigger the BaoServer to leak the flag api key.

![Challenge screenshot](5img.png)


That shd give the flag api key -->"sk-flag-44569147aa693f5154e7"

# Step 3 (Retrieving the flag)

Now we use the final key to send a req with a "x-api-token" header

![Challenge screenshot](6img.png)


TLDR;

we use the baoAddr field to steal the keys and use the keys to read out the flag.





