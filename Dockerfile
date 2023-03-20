# docker build ./ -t wldev/prerar:api-http-interface
# docker tag wldev/prerar:api-http-interface wldev/prerar:api-http-interface
# docker push wldev/prerar:api-http-interface

# kompose CONVERT
# kubectl apply -f ./ -n devlab

FROM node:18-alpine
WORKDIR ./GoodFood/http-gateway
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm","run","start"]
