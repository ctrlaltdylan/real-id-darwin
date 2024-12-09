# Build stage for dependencies and assets
FROM node:18 as build-stage

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY package*.json /var/www/html/

# Install dependencies and build assets
RUN npm install && npm run build

# Composer stage
FROM composer:latest as composer-stage

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY composer.* /var/www/html/

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Final production stage
FROM php:8.3-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    curl \
    git \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Copy application files from build stages
COPY --from=build-stage /var/www/html/public /var/www/html/public
COPY --from=build-stage /var/www/html/node_modules /var/www/html/node_modules
COPY --from=composer-stage /var/www/html /var/www/html

# Copy nginx site configuration
COPY conf/nginx/nginx-site.conf /etc/nginx/conf.d/default.conf

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 80
EXPOSE 80

# Start the application stack
CMD ["/bin/sh", "-c", "php artisan inertia:start-ssr & php-fpm & nginx -g 'daemon off;'"]
