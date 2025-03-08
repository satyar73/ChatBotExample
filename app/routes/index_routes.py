from fastapi import APIRouter, Query, HTTPException
from fastapi.responses import JSONResponse
from typing import Optional
from app.services.index_service import IndexService

router = APIRouter(prefix="/index", tags=["index"])
index_service = IndexService()
@router.post("/", description="Create and populate a vector index with Shopify data")
async def create_index(
    store: Optional[str] = Query(None, description="Shopify store name (optional)"),
    summarize: Optional[bool] = Query(None, description="Whether to summarize content using LLM")
):
    result = await index_service.create_index(store, summarize)
    return JSONResponse(
        content=result,
        status_code=200 if result.get("status") == "success" else 500
    )
@router.post("/google-drive", description="Create and populate a vector index with Google Drive data")
async def create_index_from_drive(
    folder_id: Optional[str] = Query(None, description="Google Drive folder ID (optional, uses root if not provided)"),
    recursive: Optional[bool] = Query(True, description="Whether to recursively process subfolders"),
    summarize: Optional[bool] = Query(None, description="Whether to summarize content using LLM")
):
    result = await index_service.create_index_from_drive(folder_id, recursive, summarize)
    return JSONResponse(
        content=result,
        status_code=200 if result.get("status") == "success" else 500
    )
@router.get("/", description="Get information about the current vector index")
async def get_index_info():
    result = await index_service.get_index_info()
    return JSONResponse(
        content=result,
        status_code=200 if result.get("status") == "success" else 500
    )
@router.delete("/", description="Delete the vector index")
async def delete_index():
    result = await index_service.delete_index()
    return JSONResponse(
        content=result,
        status_code=200 if result.get("status") == "success" else 500
    )
