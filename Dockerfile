FROM node:9

ENV HUBOT_NAME robotk

ADD . /opt/
WORKDIR /opt

RUN npm install --production
RUN chmod +x /opt/bin/hubot

EXPOSE 8080
VOLUME /opt/scripts

CMD ["/opt/bin/hubot", "--name", "${HUBOT_NAME}", "--adapter", "slack"]
