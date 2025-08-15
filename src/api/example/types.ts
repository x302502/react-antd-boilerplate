export interface ExampleItemDto {
  id: string;
  createdDate: string;
  updatedDate: string;
  createdBy: string | null;
  updatedBy: string | null;
  stringValue: string;
  numberValue: number;
  booleanValue: boolean;
  dateValue: string;
  dateTimeValue: string;
  selectValues: string[];
  jsonObjectValue: Record<string, string>;
  jsonArrayValue: string[];
}
