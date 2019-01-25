FROM nginx

RUN apt-get update -y && \
    apt-get install -y \
            gnupg2 \
            git-core \
            joe \
            curl && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-key adv --keyserver pgp.mit.edu --recv 9D41F3C3 && \
    echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list


RUN apt-get update -y && \
    apt-get install -y \
            nodejs \
            yarn
 
RUN curl -s -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin 

RUN yarn global add vue-cli && \
    yarn global add quasar-cli


COPY nginx.conf /etc/nginx/nginx.conf

ENV APP_DIR=/code
WORKDIR $APP_DIR
ENV PATH="/code/node_modules/.bin:${PATH}"
ENV FORWARD_TO_HTTPS=xxxxxxxxxxx

ADD package.json package.json
ADD yarn.lock yarn.lock

RUN yarn install

ADD . $APP_DIR
RUN quasar build

RUN cp -R ./dist/spa-mat/* /usr/share/nginx/html

CMD "/bin/bash"
