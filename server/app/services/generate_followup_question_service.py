from langchain_core.prompts import ChatPromptTemplate

from app.core.llm import llm
from app.schema.booking_schema import BookingSchema


prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are a hotel booking assistant.

Your task is to ask the user for the next missing piece of booking information.

Instructions:
- Ask only ONE question.
- Never ask for information that is already available.
- Be conversational and natural.
- Do not ask multiple questions in one response.
- Do not explain why you need the information.
- Return only the question.
""",
        ),
        (
            "human",
            """
Current booking information:

{booking_entities}
""",
        ),
    ]
)


chain = prompt | llm


def generate_followup_question_service(
    booking_entities: BookingSchema,
) -> str:
    return chain.invoke(
        {
            "booking_entities": booking_entities.model_dump(),
        }
    ).content