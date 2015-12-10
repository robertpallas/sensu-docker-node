FROM ubuntu:14.04

RUN apt-get install wget -yq
RUN wget -q http://repos.sensuapp.org/apt/pubkey.gpg -O- | sudo apt-key add -
RUN echo "deb     http://repos.sensuapp.org/apt sensu main" > /etc/apt/sources.list.d/sensu.list

RUN apt-get update
RUN apt-get install sensu supervisor uchiwa -yq

# Install Python
RUN \
    apt-get update && \
    apt-get install -y python-dev python-pip python-virtualenv && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN \
    cd /tmp && \
    wget http://nodejs.org/dist/node-latest.tar.gz && \
    tar xvzf node-latest.tar.gz && \
    rm -f node-latest.tar.gz && \
    cd node-v* && \
    ./configure && \
    CXX="g++ -Wno-unused-local-typedefs" make && \
    CXX="g++ -Wno-unused-local-typedefs" make install && \
    cd /tmp && \
    rm -rf /tmp/node-v* && \
    npm install -g npm && \
    printf '\n# Node.js\nexport PATH="node_modules/.bin:$PATH"' >> /root/.bashrc

ADD ./config.json /etc/sensu/config.json
ADD ./uchiwa.json /etc/sensu/uchiwa.json
ADD ./supervisord.conf /etc/supervisord.conf

# Install Node dependencies
ADD ./package.json /etc/sensu/package.json
RUN cd /etc/sensu && npm install

EXPOSE 3000 4567

CMD ["/usr/bin/supervisord"]
