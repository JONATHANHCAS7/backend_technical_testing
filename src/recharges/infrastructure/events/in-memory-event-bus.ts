import { Injectable } from '@nestjs/common';
import { EventBus } from '../../domain/events/event-bus';

@Injectable()
export class InMemoryEventBus implements EventBus {
  private handlers: Map<string, ((event: any) => void)[]> = new Map();

  publish(event: any): void {
    const eventType = event.constructor.name;
    const eventHandlers = this.handlers.get(eventType);
    if (eventHandlers) {
      eventHandlers.forEach(handler => handler(event));
    }
  }

  subscribe(eventType: string, handler: (event: any) => void): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler);
  }
}