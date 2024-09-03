import { AxiosInstance } from 'axios';

interface Deploy {
  id: string;
  commit: {
    id: string;
    message: string;
    createdAt: string;
  };
  createdAt: string;
  finishedAt: string;
  status: 'created' | 'build_in_progress' | 'update_in_progress' | 'live' | 'deactivated' | 'build_failed' | 'update_failed' | 'canceled';
  serviceId: string;
}

interface ListDeploysOptions {
  limit?: number;
  startingAfter?: string;
  endingBefore?: string;
}

export default function deploys(client: AxiosInstance) {
  return {
    list: async (serviceId: string, options?: ListDeploysOptions): Promise<Deploy[]> => {
      const response = await client.get(`/services/${serviceId}/deploys`, { params: options });
      return response.data;
    },

    get: async (serviceId: string, deployId: string): Promise<Deploy> => {
      const response = await client.get(`/services/${serviceId}/deploys/${deployId}`);
      return response.data;
    },

    create: async (serviceId: string, clearCache?: boolean): Promise<Deploy> => {
      const response = await client.post(`/services/${serviceId}/deploys`, { clearCache });
      return response.data;
    },

    cancel: async (serviceId: string, deployId: string): Promise<Deploy> => {
      const response = await client.post(`/services/${serviceId}/deploys/${deployId}/cancel`);
      return response.data;
    },

    rollback: async (serviceId: string, deployId: string): Promise<Deploy> => {
      const response = await client.post(`/services/${serviceId}/deploys/${deployId}/rollback`);
      return response.data;
    }
  };
}