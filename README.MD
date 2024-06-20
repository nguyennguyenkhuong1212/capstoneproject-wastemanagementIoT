# FOR DEVELOPERS
## CLONING REPOSITORY
1. Clone the repository
2. Go to `File` --> `Open Folder` --> `"capstoneproject-wastemanagementIoT"`
3. Open the terminal, enter this command `cd frontend` to go to frontend or `cd backend` to go to backend
4. In `frontend/src`, there is a folder named `components`, add components into this folder 
5. Run `npm install` in both `backend` and `frontend` folders to install dependencies ***(REMEMBER TO DO THIS EVERYTIME YOU START CODING TO ENSURE ALL PACKAGES IS UPDATED)***
## REMINDER BEFORE CODING
1. Remember to run this block of code before coding to update the latest version of code on main
```
git checkout main
git pull
git checkout [your_branch]
git merge main
```
## REMINDER AFTER CODING 
1. After pushing code to your branch, an automatically-created pull request will appear. This will be informed through an email send to your email account.
2. Remember to review and approve your code, so that it could be merged.

## RUN FRONTEND AND BACKEND
### FOR FRONTEND
Use `npm start`
### FOR BACKEND
Use `npm run server`

## FOR UPDATE NEW WEBSITE VERSION ON EC2 INSTANCE
```
ssh -i [your_key_path] ec2-user@54.251.168.188
pm2 stop 0
cd capstoneproject-wastemanagementIoT
bash update.sh
```

## CODE FOR REBUILD AND REDEPLOY
```
pm2 start "gunicorn -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000 main:app" --name routingbackend
pm2 serve ./build 3001 --name "routingfrontend" --spa
pm2 serve ./build 3000 --name "dashboard" --spa
pm2 start server.js
```