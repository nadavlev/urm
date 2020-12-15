export const NUM_OF_VECTORS = 32;
export const VECTOR_START_COUNT = 1;
export const NUM_OF_BITS = 31;
export const BIT_START_COUNT = 0;
export const USER_RIGHTS_COLUMNS: string[] = ['title', 'vector', 'bit', 'value_1', 'value_2'];
export const PENDING_CHANGE_COLUMN: string[] = ['title','subsystem', 'vector', 'bit', 'value', 'remove'];
export const BIT_COLUMN_NAME = 'Bit';
export const VECTOR_COLUMN_NAME = 'Vector';

export enum MatrixDirection {
  VectorAsRow,
  BitAsRow
}
