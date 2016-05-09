FROM node:latest
MAINTAINER cafeburger
WORKDIR /var/www/ecomm
RUN npm install -g pm2@latest
RUN mkdir /var/log/pm2
EXPOSE 3000
ENTRYPOINT ["pm2", "start", "server.js","--name","ecomm","--log","/var/log/pm2/pm2.log","--watch","--no-daemon"]


# To build:
# docker build -f Dockerfile --tag cafeburger/ecomm .

# To run:
# docker run -d -p 3000:3000 -v $(pwd):/var/www/ecomm -w /var/www/ecomm cafeburger/ecomm
# docker run -d -p 8080:8080 --name codewithdan_node codewithdan_node
