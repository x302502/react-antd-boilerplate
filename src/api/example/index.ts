import { fakeApiConnector } from '~/connectors';
import { ExampleItemDto } from './types';
import { PageRequest, PageResponse } from '~/api/@common/types';

const ENDPOINT = {
  LIST: 'api/mock/example/list',
};
class ExampleApi {
  list(params: PageRequest & { keyword?: string }) {
    return fakeApiConnector.get<PageResponse<ExampleItemDto>>(ENDPOINT.LIST, params);
  }
}
export const exampleApi = new ExampleApi();
