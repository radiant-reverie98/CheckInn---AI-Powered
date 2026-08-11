from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv

load_dotenv()
get_llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model=os.getenv("GROQ_MODEL_NAME"),
    max_retries = 3
    
)