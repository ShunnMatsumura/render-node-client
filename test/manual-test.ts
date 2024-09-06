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
    console.log("Updating service plan to pro_ultra");
    const serviceId = "your-service-id-here";
    await client.services.update(serviceId, {
      serviceDetails: {
        plan: "pro_ultra",
      },
    });

    console.log("Service plan updated to pro_ultra");

    const service = await client.services.get(serviceId);
    console.log(service);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

runTests();