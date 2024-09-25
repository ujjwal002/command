Aws-secret

pwd
glances

sudo rm -r /etc/nginx/conf.d/_
sudo cp -r conf.d/_ /etc/nginx/conf.d/
sudo mv /etc/nginx/conf.d/app_after_cert_install.conf /etc/nginx/conf.d/app.conf

cd /root/vaiu/frontend
npm run build

sudo mkdir -p /var/www/site
sudo rm -rf /var/www/site/dist
sudo cp -r /home/ubuntu/vaiu/frontend/dist/ /var/www/site/dist
sudo nginx -s reload

pgrep tesseract
