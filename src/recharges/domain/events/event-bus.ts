export interface EventBus {
  publish(event: any): void;
  subscribe(eventType: string, handler: (event: any) => void): void;
}