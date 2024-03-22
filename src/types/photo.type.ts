export type PhotoType = {
  id: number | null;
  src?: string | null;
  url?: string | null; // -> this is from paxer api image
  caption?: unknown;
  type?: string | 'image' | null;
  place?: string;
  order?: number | null;
  width?: number | `${number}` | null;
  height?: number | `${number}` | null;
  orientation?: string | null;
  srcSet?: unknown;
};
