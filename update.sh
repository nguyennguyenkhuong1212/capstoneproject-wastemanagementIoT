git switch main
git fetch -p
git pull
cd frontend
npm run build-prod
pm2 serve ./build 3000 --name "client" --spa