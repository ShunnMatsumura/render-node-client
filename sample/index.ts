import dotenv from 'dotenv';
import RenderClient from 'render-node-client';

dotenv.config();

const apiKey = process.env.RENDER_API_KEY;

if (!apiKey) {
  console.error('RENDER_API_KEY is not set in the environment variables');
  process.exit(1);
}

const client = new RenderClient(apiKey);

async function main() {
  try {
    const serviceDetails = await client.services.get("srv-fasdfasfdas");
    console.log('Service details:', serviceDetails); 
  } catch (error) {
    console.error('Error:', error);
  }
}

main();