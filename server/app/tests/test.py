from langchain_core.messages import HumanMessage, AIMessage

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

    seen = set()
    for chunk in booking_agent.stream(
        {"messages": [HumanMessage(content=user_input)]},
        config=config,
        stream_mode="values",
    ):
        last_message = chunk["messages"][-1]

        if id(last_message) in seen:
            continue
        seen.add(id(last_message))

        if isinstance(last_message, AIMessage):
            last_message.pretty_print()