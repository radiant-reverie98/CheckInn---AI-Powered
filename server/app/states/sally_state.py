from typing import TypedDict
from app.schemas.intent import DetectedIntent


class SallyState(TypedDict):
    user_message: str

    intents: list[DetectedIntent]

    entities: dict

    response: str