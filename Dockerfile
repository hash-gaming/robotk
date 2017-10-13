FROM node:8

ENV HUBOT_NAME robotk

ADD . /opt/
WORKDIR /opt

RUN npm install --production

EXPOSE 8080
VOLUME /opt/scripts

CMD ["/opt/bin/hubot", "--name", "${HUBOT_NAME}", "--adapter", "slack"]
