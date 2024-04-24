import { setupInterceptors } from '../../services';
import axios from 'axios';

type Config = {
  baseURL: string;
};

function useApi(config: Config) {
  const api = setupInterceptors(
    axios.create({
      baseURL: config.baseURL,
    })
  );

  return { api };
}

export default useApi;
