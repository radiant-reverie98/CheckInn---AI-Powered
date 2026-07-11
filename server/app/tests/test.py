from langchain_core.messages import HumanMessage, AIMessageChunk

from app.agent.booking_agent import booking_agent

config = {
    "configurable": {
        "thread_id": "booking-session-1"
    }
}


print("=" * 60)
print("CheckInn Booking Agent")
print("Type 'exit' to quit.")
print("=" * 60)


while True:
    user_input = input("\nYou: ")

    if user_input.lower() == "exit":
        break

    print("\nAI: ", end="", flush=True)

    for msg_chunk, metadata in booking_agent.stream(
        {"messages": [HumanMessage(content=user_input)]},
        config=config,
        stream_mode="messages",
    ):
        # Only care about chunks coming from the chat model
        if not isinstance(msg_chunk, AIMessageChunk):
            continue

        # Skip tool call chunks (the "and all" you mentioned)
        if msg_chunk.tool_call_chunks:
            continue

        # Skip chunks that are just tool_calls with no text content
        if not msg_chunk.content:
            continue

        # content can sometimes be a list of blocks (e.g. with some providers)
        if isinstance(msg_chunk.content, str):
            print(msg_chunk.content, end="", flush=True)
        else:
            for block in msg_chunk.content:
                if isinstance(block, dict) and block.get("type") == "text":
                    print(block.get("text", ""), end="", flush=True)

    print()  # newline after the response finishes