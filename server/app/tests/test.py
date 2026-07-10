from langchain_core.messages import HumanMessage

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

    response = booking_agent.invoke(
        {
            "messages": [
                HumanMessage(content=user_input)
            ]
        },
        config=config,
    )

    print("\nAssistant:", response["messages"][-1].content)