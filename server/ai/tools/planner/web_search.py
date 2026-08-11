from langchain.tools import tool
from langchain_tavily import TavilySearch
from dotenv import load_dotenv

load_dotenv()

tavily = TavilySearch(
    max_results=5,
    topic="general",
    
)

@tool
def web_search(query: str):
    """
    Search the web for current travel-related information.

    Use this tool to find information such as:
    - Tourist attractions
    - Opening hours
    - Entry fees
    - Restaurants and cafes
    - Markets and shopping areas
    - Local experiences
    - Events
    - Travel recommendations

    Args:
        query: A specific travel-related search query.
    """

    try:
        response = tavily.invoke({
            "query": query
        })

        results = response.get("results", [])

        if not results:
            return {
                "query": query,
                "results": [],
                "message": "No relevant search results found."
            }

        useful_results = []

        for result in results[:3]:
            useful_results.append({
                "title": result.get("title"),
                "content": result.get("content", "")[:700],
                "url": result.get("url"),
                "relevance_score": round(
                    result.get("score", 0),
                    3
                )
            })

        return {
            "query": query,
            "results": useful_results
        }

    except Exception as e:
        return {
            "error": f"Web search failed: {str(e)}"
        }


