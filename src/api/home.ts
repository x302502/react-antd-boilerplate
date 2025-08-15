import { fakeApiConnector } from '~/connectors';

export interface PieDataType {
  value: number;
  code: string;
}
export const fetchPie = (data: { by: string | number }) => {
  return fakeApiConnector.get<PieDataType[]>('api/home/pie', { searchParams: data });
};

export const fetchLine = (body: { range: string }) => {
  return fakeApiConnector.post<string[]>('api/home/line', body);
};
