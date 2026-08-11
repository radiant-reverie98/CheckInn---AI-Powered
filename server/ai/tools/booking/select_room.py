from langchain_core.tools import tool


@tool
def select_room(room_id: int) -> dict:
    """
    Select a room after the user explicitly chooses one.

    Use this only when the user has clearly selected a room
    from the previously displayed room options.
    """

    return {
        "success": True,
        "room_id": room_id,
        "message": "ROOM_SELECTED"
    }