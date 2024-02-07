import { useState, useEffect } from "react";
import { eleganceClient } from "@/services/eleganceClient";
import {
  MinChatUiProvider,
  MainContainer,
  MessageInput,
  MessageContainer,
  MessageList,
  MessageHeader,
} from "@minchat/react-chat-ui";


type ChatProps = {
  // The collection name that contains the embeddings
  collection: string;
};

type ChatMessage = {
    user: { name: "User" | "AI", id: 'user' | 'ai'},
    text: string
}

const Chat = ({ collection }: ChatProps) => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Define the chat completion hook using the Elegance SDK
  const chatCompletion = eleganceClient.hooks.useSearchChatCompletion();
  // Define the effect to generate text using ChatGPT
  useEffect(() => {
    async function getResponse() {
        if (input) {
            // Get the chat completion function from the hook
            const { execute: getChatCompletion } = chatCompletion;
            // Call the chat completion function with the input and the collection
            const result = await getChatCompletion({
              prompt: input,
              collection: collection,
              embeddingField: "embedding",
              textField: "text",
            })

            if(result?.content) {
                console.log(result.content);
                const userInputMessage: ChatMessage = {
                    user: { name: "User", id: 'user' },
                    text: input,
                  };
                  // Create a new message object for the chat completion
                  const chatCompletionMessage: ChatMessage = {
                    user: { name: "AI", id: 'ai' },
                    text: result.content,
                  };
            
                  // Add the new messages to the state
                  setMessages([...messages, userInputMessage, chatCompletionMessage]);
                  
                  // Clear the input state
                  setInput("");
            }
        }
    }

    getResponse();

  }, [input, collection, messages, chatCompletion]);

  return (
    <MinChatUiProvider theme="#6ea9d7">
      <MainContainer>
        <MessageContainer>
          <MessageHeader />
          <MessageList
            currentUserId="user"
            messages={messages}
          />
          <MessageInput
            onSendMessage={setInput}
            showSendButton
            placeholder="Enter your question here..."
          />
        </MessageContainer>
      </MainContainer>
    </MinChatUiProvider>
  );
};

export default Chat;