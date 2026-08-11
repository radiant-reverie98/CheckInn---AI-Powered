from state.sally_state import SallyState
from strucutred_output.orchestrator import IntentType

def intent_router(state: SallyState)-> str:
    pending_agent = state.get('pending_agent')
    intent = state['intent']
    confidence_score = state['confidence_score']
    
    if pending_agent is not None:
        return pending_agent
    
    if intent == "none" or confidence_score < 0.6:
        return "follow_up"
    
    return intent