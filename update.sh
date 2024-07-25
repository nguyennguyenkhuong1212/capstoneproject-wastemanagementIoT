cd /home/ec2-user/capstoneproject-wastemanagementIoT
git switch main
git fetch -p
git pull
cd /home/ec2-user/capstoneproject-wastemanagementIoT/frontend
pm2 stop 0
npm run build-prod
pm2 serve ./build 3000 --name "client" --spa