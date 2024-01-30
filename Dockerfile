FROM node:20.4.0

LABEL Eiriksgata <rulateday@gmail.com>

ADD .output .output

# expose the host and port 3000 to the server
ENV HOST 0.0.0.0
# Expose Port
EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]
