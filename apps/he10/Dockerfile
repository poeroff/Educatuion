FROM gyiaab6h.private-ncr.gov-ntruss.com/gitlab-runner-image-nginx-slim:1.0
COPY /dist/apps/he10 /usr/share/nginx/html
COPY /dist/packages/ui /usr/share/nginx/html
COPY /apps/he10/cicd/nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]