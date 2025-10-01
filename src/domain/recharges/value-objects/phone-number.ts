export class PhoneNumber {
  private readonly value: string;

  constructor(value: string) {
    if (!/^3\d{9}$/.test(value)) {
      throw new Error('Phone number must start with 3 and contain only 10 digits');
    }
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PhoneNumber): boolean {
    return this.value === other.value;
  }
}