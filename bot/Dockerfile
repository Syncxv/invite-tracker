FROM node:18-alpine3.15

# RUN addgroup app && adduser -S -G app app
# RUN mkdir /app && chown app:app /app

# USER app

# WORKDIR /app

# COPY ./package*.json yarn.lock  ./
# COPY . .

# RUN yarn install

# EXPOSE 3000
FROM node:18.0.0 as base

# Add package file
COPY package.json ./
COPY yarn.lock ./
# COPY scripts/dev.sh ./scripts/dev.sh

# Install deps
RUN yarn install

# Copy source
COPY src ./src
# COPY etc ./etc
COPY tsconfig.json ./tsconfig.json
# COPY openapi.json ./openapi.json

# Build dist
RUN yarn build

# Start production image build
FROM gcr.io/distroless/nodejs:18

# Copy node modules and build directory
COPY --from=base ./node_modules ./node_modules
COPY --from=base /dist /dist

# Copy static files
# COPY src/public dist/src/public

# Expose port 3000
EXPOSE 3000

CMD ["dist/index.js"]
