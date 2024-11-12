1. Для запуска базы данных нужно в корне проекта ввести
   docker compose build
   docker compose up
2. Для запуска бэкэнда website спускаемся в папку website
   pip install --no-cache-dir -r requirements.txt
   python -m uvicorn app.main:app --host 0.0.0.0 --port 5174 --reload --env-file ../.env

3. Для запуска бэкэнда chat спускаемся в папку chat/chat
   RUN pip install --no-cache-dir -r requirements.txt
   python -m uvicorn app.main:app --host 0.0.0.0 --port 5174 --reload --env-file ../.env

4. Для запуска фронтэнда
   npm i
   npm run dev
