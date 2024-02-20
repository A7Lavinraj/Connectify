export async function getMessages(conversationId: string) {
  const response = await fetch(
    `http://localhost:3000/api/messages/${conversationId}`,
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
  const response = await fetch("http://localhost:3000/api/messages", {
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
  const response = await fetch(
    `http://localhost:3000/api/conversation/${email}`,
    {
      method: "GET"
    }
  );

  return await response.json();
}

export async function addConversation(
  userEmail: string,
  conversationEmail: string
) {
  const response = await fetch("http://localhost:3000/api/conversation/", {
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
  const response = await fetch(
    `http://localhost:3000/api/conversation/${conversationId}`,
    {
      method: "DELETE"
    }
  );

  return await response.json();
}
