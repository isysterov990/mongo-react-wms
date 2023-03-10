from typing import Optional
from pydantic import BaseModel, Field


def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }

def ErrorResposeModel(error, code, message):
    return {
        "error": error,
        "code": code,
        "message": message,
        }