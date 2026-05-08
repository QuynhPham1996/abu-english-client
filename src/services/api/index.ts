import env from '@/env';
import AuthorizedInstance from '@/services/authorized-api';

const ApiService = AuthorizedInstance(env.api.baseUrl.service);

export default ApiService;
export * from './auth';
export * from './user';
export * from './notification';
export * from './course';
export * from './exercise';
export * from './lesson';
export * from './question';
export * from './test';
export * from './public';
