# render-node-client

A Node.js client library for interacting with the Render API.

> **⚠️ IMPORTANT NOTICE**
> 
> This package is currently under development and has not been published yet.
> It is not available for installation via npm at this time.
> We appreciate your interest and ask for your patience as we prepare for the official release.

## Installation

```bash
$ npm install render-node-client
```

## Usage

First, import the RenderClient and create an instance:

```javascript
import RenderClient from 'render-node-client';

const apiKey = process.env.RENDER_API_KEY;
const client = new RenderClient(apiKey);
```

### Services

List all services:

```javascript
const services = await client.services.list();
console.log(services);
```

Get details of a specific service:

```javascript
const serviceId = 'srv-123456';
const serviceDetails = await client.services.get(serviceId);
console.log(serviceDetails);
```

### Deploys

List deploys for a service:

```javascript
const serviceId = 'srv-123456';
const deploys = await client.deploys.list(serviceId);
console.log(deploys);
```

```javascript
Create a new deploy:

const serviceId = 'srv-123456';
const newDeploy = await client.deploys.create(serviceId);
console.log(newDeploy);
```

## API Reference

### Services

```
- services.list(): List all services
- services.get(id: string): Get details of a specific service
- services.create(data: object): Create a new service
- services.update(id: string, data: object): Update a service
- services.delete(id: string): Delete a service
- services.suspend(id: string): Suspend a service
- services.resume(id: string): Resume a service
- services.scaleInstanceCount(id: string, numInstances: number): Scale service instance count
- services.getEnvironmentVariables(id: string): Get environment variables for a service
- services.updateEnvironmentVariables(id: string, envVars: object): Update environment variables for a service
- services.deleteEnvironmentVariable(id: string, key: string): Delete an environment variable for a service
- services.getEvents(id: string): Get events for a service
```

### Deploys

```
- deploys.list(serviceId: string, options?: object): List deploys for a service
- deploys.get(serviceId: string, deployId: string): Get details of a specific deploy
- deploys.create(serviceId: string, clearCache?: boolean): Create a new deploy
- deploys.cancel(serviceId: string, deployId: string): Cancel a deploy
- deploys.rollback(serviceId: string, deployId: string): Rollback to a previous deploy
```

## Error Handling

The library uses async/await, so you can use try/catch blocks for error handling:

```javascript
try {
  const services = await client.services.list();
  console.log(services);
} catch (error) {
  console.error('An error occurred:', error);
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.