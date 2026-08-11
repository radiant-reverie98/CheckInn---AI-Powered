from pydantic import BaseModel, Field
from typing import Optional
from datetime import date

from strucutred_output.orchestrator import IntentType


class PlannerOutput(BaseModel):

    start_date: Optional[date] = Field(
        default=None,
        description=(
            "Trip start date in YYYY-MM-DD format. "
            "Leave None if not known."
        )
    )

    end_date: Optional[date] = Field(
        default=None,
        description=(
            "Trip end date in YYYY-MM-DD format. "
            "Leave None if not known."
        )
    )

    num_guests: Optional[int] = Field(
        default=None,
        ge=1,
        description=(
            "Number of travelers. "
            "Leave None if not provided or known."
        )
    )

    destination: Optional[str] = Field(
        default=None,
        description=(
            "Travel destination such as city, region, or country. "
            "Leave None if not known."
        )
    )

    pending_agent: Optional[IntentType] = Field(
        default=None,
        description=(
            "Set to IntentType.PLANNER only when the planner asks the user "
            "a follow-up question and needs the user's next message routed "
            "back to the planner. Otherwise leave None."
        )
    )