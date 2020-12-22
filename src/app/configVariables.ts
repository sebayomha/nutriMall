import { environment } from '../environments/environment';
export const BASE_URL = (environment.production) ? 'http://localhost:80' : 'http://localhost:80';