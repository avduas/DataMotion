Installation:
1. Install node.js, npm
sudo apt-get update
sudo apt-get install nodejs npm
sudo apt-get install npm
2. Reddis and PostgreSQL installation
sudo apt-get install redis-server
sudo apt-get install postgresql postgresql-contrib
3. git clone (repository) in the app
4. Run systemmd:
a. Create file app_env.js "sudo nano /lib/systemd/system/app_env.service"
b.paste next there:
[Unit]
Description=My App Description
After=network.target
[Service]
Environment=NODE_PORT=3010
Type=simple
User=alexandr
WorkingDirectory=/app/backend
ExecStart=/usr/bin/node /app/backend/app.js
[Install]
WantedBy=multi-user.target
c.sudo systemctl daemon-reload
sudo systemctl start app_env
check bu status: sudo systemctl status app_env