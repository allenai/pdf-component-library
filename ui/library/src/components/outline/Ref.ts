export default class Ref {
  num: number;
  gen: number;

  constructor({ num, gen }: any) {
    this.num = num;
    this.gen = gen;
  }

  toString() {
    return this.gen !== 0 ? `${this.num}R${this.gen}` : `${this.num}R`;
  }
}