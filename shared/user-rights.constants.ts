export const NUM_OF_VECTORS = 32;
export const VECTOR_START_COUNT = 1;
export const NUM_OF_BITS = 30;
export const BIT_START_COUNT = 0;
export const USER_RIGHTS_COLUMNS: string[] = ['title', 'vector', 'bit', 'value'];
export const PENDING_CHANGE_COLUMN: string[] = [...USER_RIGHTS_COLUMNS, 'remove'];
export const BIT_COLUMN_NAME = 'Bit';
export const VECTOR_COLUMN_NAME = 'Vector';

export enum MatrixDirection {
  VectorAsRow,
  BitAsRow
}
