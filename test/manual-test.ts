import dotenv from 'dotenv';
import RenderClient from '../src/index';

dotenv.config();

const apiKey = process.env.RENDER_API_KEY;

if (!apiKey) {
  console.error('RENDER_API_KEY is not set in the environment variables');
  process.exit(1);
}

const client = new RenderClient(apiKey);

async function runTests() {
  try {
    const services = await client.services.list();

    if (services.length > 0) {
      const serviceId = services[0].id;
      console.log(`\nFetching details for service ${serviceId}...`);
      const serviceDetails = await client.services.get("srv-cr7jl33tq21c73d8te80");
      console.log('Service details:', serviceDetails);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

runTests();