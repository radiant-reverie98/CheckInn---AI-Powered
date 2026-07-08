from app.nodes.intent_classifier import classify_intent


def main():
    state = {
        "user_message": "I had a hotel booked at Lisbon which I now want to cancel.",
        "intents": [],
        "entities": {},
        "response": ""
    }

    result = classify_intent(state)

    print("\nDetected Intents:\n")

    for intent in result["intents"]:
        print(intent)


if __name__ == "__main__":
    main()