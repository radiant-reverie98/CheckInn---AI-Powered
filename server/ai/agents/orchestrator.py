from llm import get_llm
from langchain.agents import create_agent
from rich import print
from strucutred_output.orchestrator import OrchestratorIntent




orchestrator_agent = create_agent(
    model=get_llm,
    system_prompt=ORCHESTRATOR_SYSTEM_PROMPT,
    response_format=OrchestratorIntent
)