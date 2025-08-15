/**
 * 数组形式的接口返回数据格式
 * list: 接口返回数据
 */
interface ApiListResponse<T> {
  list: T[];
  total: number;
  current: number;
}

/**
 * 拉取表格请求参数
 */
interface ApiTableRequest extends Record<string, any> {
  cqs?: string;
  pageSize?: number;
  current?: number;
}

type Recordable<T = any> = Record<string, T>;
