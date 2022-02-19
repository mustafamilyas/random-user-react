export interface HeadCell<T> {
  id: keyof T;
  label: string;
  numeric: boolean;
}
