## Getting Started
### Create .env file in the root directory and add the following variables:
```bash
BOT_TOKEN=...

MONGODB_URI=...
```
### Start app
```bash
uvicorn app:create_app --reload --factory
``` 