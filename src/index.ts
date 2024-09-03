import axios, { AxiosInstance } from 'axios';
import deploys from './api/deploys';
import services from './api/services';

class RenderClient {
  private apiKey: string;
  private baseURL: string;
  private client: AxiosInstance;
  public services: ReturnType<typeof services>;
  public deploys: ReturnType<typeof deploys>;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.render.com/v1';
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    this.services = services(this.client);
    this.deploys = deploys(this.client);
  }
}

export default RenderClient;