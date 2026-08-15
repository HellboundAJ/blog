
--- title: My New Writeup date: 2026/09/01 category: Pwn tags: pwn, heap cover: writeup-web excerpt: One line shown on the card. ---

# Challenge Overview

![[Pasted image 20260810111715.png]]

From the config.hcl nd the urls given, we can see that to read the flag, we need to send the FLAG_API_KEY with "x-api-token header"


# Step 1 (Stealing the api key for OpenBao)
Opening the instance gives us 3 different urls

![[Pasted image 20260810111754.png]]

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

![[Pasted image 20260810113500.png]]

Sending the message will show a internal server error, with a request to our webhook

![[Pasted image 20260810113638.png]]

# Step 2 (Stealing the api key for the flag service)
We have successfully found the api key for OpenBao server --> `nabi-local-app-token-9c3e680272d5ca0ac9112f7b71d1bf`


Now we can use this to trigger the BaoServer to leak the flag api key.

![[Pasted image 20260810114553.png]]


That shd give the flag api key -->"sk-flag-44569147aa693f5154e7"

# Step 3 (Retrieving the flag)

Now we use the final key to send a req with a "x-api-token" header

![[Pasted image 20260810114746.png]]


TLDR;

we use the baoAddr field to steal the keys and use the keys to read out the flag.





