const BASE_API_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

export async function getMessages(conversationId: string) {
  if (!conversationId) return null;

  const response = await fetch(
    `${BASE_API_URL}/api/messages/${conversationId}`,
    {
      method: "GET"
    }
  );

  return await response.json();
}

export async function sendMessage(
  message: string,
  conversationId: string,
  email: string
) {
  if (!message || !conversationId || !email) return null;

  const response = await fetch(`${BASE_API_URL}/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: message,
      email: email,
      conversationId: conversationId
    })
  });

  return response.json();
}

export async function getConversations(email: string) {
  console.log(BASE_API_URL);
  if (!email) return null;

  const response = await fetch(`${BASE_API_URL}/api/conversation/${email}`, {
    method: "GET"
  });

  return await response.json();
}

export async function addConversation(
  userEmail: string,
  conversationEmail: string
) {
  if (!userEmail || !conversationEmail) return null;

  const response = await fetch(`${BASE_API_URL}/api/conversation/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userEmail,
      conversationEmail
    })
  });

  return await response.json();
}

export async function removeConversation(conversationId: string) {
  if (!conversationId) return null;

  const response = await fetch(
    `${BASE_API_URL}/api/conversation/${conversationId}`,
    {
      method: "DELETE"
    }
  );

  return await response.json();
}

export async function getUsers(email: string) {
  if (!email) return null;

  const response = await fetch(`${BASE_API_URL}/api/users/${email}`);
  return await response.json();
}
