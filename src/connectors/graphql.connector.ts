import { optionalApiConnector } from './api.connector';

interface IGraphqlBody {
  query: string;
  operationName?: string;
  extensions?: any;
}

interface IGraphqlResponse<TData = any> {
  data: TData;
}

export class GraphqlApiConnector {
  async call<TData = any>(url: string, { query, extensions = {}, operationName = 'MyQuery' }: IGraphqlBody) {
    return optionalApiConnector
      .post<IGraphqlResponse<TData>>(url, { query, extensions, operationName })
      .then(res => res.data);
  }
}

export const graphqlApiConnector = new GraphqlApiConnector();
