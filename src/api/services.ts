import { AxiosInstance } from 'axios';

export type ServiceType = 'static_site' | 'web_service' | 'private_service' | 'background_worker' | 'cron_job';
export type ServicePlan = 'starter' | 'standard' | 'pro' | 'pro_plus' | 'pro_max' | 'pro_ultra';

interface OpenPort {
  port: number;
  protocol: string;
}

interface ParentServer {
  id: string;
  name: string;
}

interface Disk {
  name: string;
  mountPath: string;
  sizeGB: number;
}

interface Service {
  id: string;
  type: ServiceType;
  repo: string;
  name: string;
  autoDeploy: boolean;
  branch: string;
  createdAt: string;
  notifyOnFail: string;
  ownerId: string;
  slug: string;
  suspended: string;
  suspenders: string[];
  updatedAt: string;
  buildCommand?: string;
  dockerCommand?: string;
  dockerContext?: string;
  dockerfilePath?: string;
  env?: string;
  plan?: ServicePlan;
  region?: string;
  healthCheckPath?: string;
  publishPath?: string;
  numInstances?: number;
  pullRequestPreviewsEnabled?: boolean;
  openPorts?: OpenPort[];
  parentServer?: ParentServer;
  url?: string;
  disk?: Disk;
  schedule?: string;
  lastSuccessfulRunAt?: string;
}

interface CreateServiceOptions {
  type: ServiceType;
  name: string;
  repo: string;
  branch: string;
  autoDeploy?: boolean;
  buildCommand?: string;
  startCommand?: string;
  env?: string;
  envVars?: Record<string, string>;
  plan?: string;
  region?: string;
  numInstances?: number;
  healthCheckPath?: string;
  publishPath?: string;
  pullRequestPreviewsEnabled?: boolean;
  disk?: Disk;
  schedule?: string;
}

interface UpdateServiceOptions extends Partial<CreateServiceOptions> {
  autoDeploy?: boolean;
  repo?: string;
  branch?: string;
  buildCommand?: string;
  image?: {
    ownerId: string;
    registryCredentialId?: string;
    imagePath: string;
  };
  name?: string;
  buildFilter?: {
    paths: string[];
    ignorePaths: string[];
  };
  rootDir?: string;
  serviceDetails?: {
    plan: ServicePlan;
  };
}

export default function services(client: AxiosInstance) {
  return {
    list: async (): Promise<Service[]> => {
      const response = await client.get('/services');
      return response.data;
    },

    get: async (id: string): Promise<Service> => {
      const response = await client.get(`/services/${id}`);
      return response.data;
    },

    create: async (options: CreateServiceOptions): Promise<Service> => {
      const response = await client.post('/services', options);
      return response.data;
    },

    update: async (id: string, options: UpdateServiceOptions): Promise<Service> => {
      const response = await client.patch(`/services/${id}`, options);
      return response.data;
    },

    delete: async (id: string): Promise<void> => {
      await client.delete(`/services/${id}`);
    },

    suspend: async (id: string): Promise<Service> => {
      const response = await client.post(`/services/${id}/suspend`);
      return response.data;
    },

    resume: async (id: string): Promise<Service> => {
      const response = await client.post(`/services/${id}/resume`);
      return response.data;
    },

    restart: async (id: string): Promise<Service> => {
      const response = await client.post(`/services/${id}/restart`);
      return response.data;
    },

    scaleInstanceCount: async (id: string, numInstances: number): Promise<Service> => {
      const response = await client.post(`/services/${id}/scale`, { numInstances });
      return response.data;
    },

    getEnvironmentVariables: async (id: string): Promise<Record<string, string>> => {
      const response = await client.get(`/services/${id}/env-vars`);
      return response.data;
    },

    updateEnvironmentVariables: async (id: string, envVars: Record<string, string>): Promise<Record<string, string>> => {
      const response = await client.put(`/services/${id}/env-vars`, envVars);
      return response.data;
    },

    deleteEnvironmentVariable: async (id: string, key: string): Promise<void> => {
      await client.delete(`/services/${id}/env-vars/${key}`);
    },

    getEvents: async (id: string): Promise<any[]> => {
      const response = await client.get(`/services/${id}/events`);
      return response.data;
    },
  };
}