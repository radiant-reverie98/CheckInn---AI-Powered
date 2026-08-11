from dotenv import load_dotenv
from langchain_core.messages import HumanMessage
from graph import workflow
from rich import print

load_dotenv()


config = {
    "configurable": {
        "thread_id": "test-user-1"
    }
}


print("Chat with Sally")
print("Type 'exit' to stop.\n")


while True:

    user_input = input("You: ")

    if user_input.lower() == "exit":
        break

    result = workflow.invoke(
        {
            "messages": [
                HumanMessage(content=user_input)
            ]
        },
        config=config
    )

    print("\nSally:", result["messages"][-1].content)
    print()