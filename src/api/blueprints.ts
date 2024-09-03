import { AxiosInstance } from 'axios';

interface Blueprint {
  id: string;
  name: string;
  repoUrl: string;
  repoBranch: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

interface ListBlueprintsOptions {
  limit?: number;
  cursor?: string;
  owners?: string[];
}

export default function blueprints(client: AxiosInstance) {
  return {
    list: async (options?: ListBlueprintsOptions): Promise<Blueprint[]> => {
      const response = await client.get('/blueprints', { params: options });
      return response.data;
    },

    retrieve: async (id: string): Promise<Blueprint> => {
      const response = await client.get(`/blueprints/${id}`);
      return response.data;
    },

    update: async (id: string, data: Partial<Blueprint>): Promise<Blueprint> => {
      const response = await client.patch(`/blueprints/${id}`, data);
      return response.data;
    },

    disconnect: async (id: string): Promise<void> => {
      await client.delete(`/blueprints/${id}`);
    },

    listSyncs: async (id: string): Promise<any[]> => {
      const response = await client.get(`/blueprints/${id}/syncs`);
      return response.data;
    },
  };
}