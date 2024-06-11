module.exports = {
    apps: [
      {
        name: 'fastapi-app',
        script: 'uvicorn',
        args: 'main:app --host 54.251.168.188 --port 8000',
        interpreter: 'python3',
        watch: true
      }
    ]
  };
  