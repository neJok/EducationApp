from app.configuration.routers.routers import Routers
from app.internal.routes import users, top, subjects

__routers__ = Routers(routers=(users.router, top.router, subjects.router))
