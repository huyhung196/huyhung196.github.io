FROM nginx:alpine

# Xóa config mặc định
RUN rm /etc/nginx/conf.d/default.conf

# Copy config nginx custom
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy source web
COPY . /usr/share/nginx/html

EXPOSE 80
