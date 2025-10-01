export class Amount {
  private readonly value: number;

  constructor(value: number) {
    if (value < 1000 || value > 100000) {
      throw new Error('Amount must be between 1000 and 100000');
    }
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  equals(other: Amount): boolean {
    return this.value === other.value;
  }
}