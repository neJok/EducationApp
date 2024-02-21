from fastapi import FastAPI
from app.configuration.routers import __routers__
from starlette.middleware.cors import CORSMiddleware

from app.internal.events.startup import startup


class Server:
    __app: FastAPI

    def __init__(self, app: FastAPI):
        self.__app = app

        self.__register_routers(app)
        self.__register_middlewares(app)
        self.__register_events(app)

    def get_app(self) -> FastAPI:
        return self.__app

    @staticmethod
    def __register_events(app):
        app.on_event('startup')(startup)

    @staticmethod
    def __register_routers(app):
        __routers__.register_routers(app)

    @staticmethod
    def __register_middlewares(app):
        app.add_middleware(CORSMiddleware,
                           allow_origins=["*"],
                           allow_credentials=True,
                           allow_methods=["*"],
                           allow_headers=["*"]
                           )
