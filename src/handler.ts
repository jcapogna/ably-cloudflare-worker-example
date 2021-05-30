import { Rest } from 'ably/promises'

const apiKey = "KEY";
const ably = new Rest({ key: apiKey });

export async function handleRequest(request: Request): Promise<Response> {
  let token: any = {error: "failed"};
  try {
    token = await createTokenRequest();
  } catch (e) {
    console.log("Failed to create token", e)
  }

  let history: any = {error: "failed"};
  try {
    history = await getChannelHistory();
  } catch (e) {
    console.log("Failed to get channel history", e)
  }

  const response = {
    "token": token,
    "history": history
  }

  return new Response(JSON.stringify(response));
}

// Works
async function createTokenRequest() {
  return await ably.auth.createTokenRequest({});
}

// Errors with "TypeError: e.Request is not a function"
async function getChannelHistory() {
  const channel = ably.channels.get("channel");
  const messages = await channel.history();
  return {
    numMessages: messages.items.length
  }
}
