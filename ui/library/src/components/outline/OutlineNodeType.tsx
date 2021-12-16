type NullableString = string | null;
type Destination = NullableString | any[];

type OutlineNode = {
  title: string;
  bold: boolean;
  italic: boolean;
  color: Uint8ClampedArray;
  dest: Destination;
  url: NullableString;
  unsafeUrl: string | undefined;
  newWindow: boolean | undefined;
  count: number | undefined;
  items: any[];
}

export { Destination, OutlineNode }