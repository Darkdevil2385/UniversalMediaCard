// Simplified Home Assistant types
export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService: (domain: string, service: string, serviceData?: Record<string, any>) => Promise<void>;
  localize: (key: string, ...args: any[]) => string;
  config: {
    unit_system: {
      length: string;
      mass: string;
      temperature: string;
      volume: string;
    };
    time_zone: string;
  };
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
  context: {
    id: string;
    parent_id: string | null;
    user_id: string | null;
  };
}
