import 'reflect-metadata';
import { AGENT_CONFIG_KEY } from '../decorators';

export function getAgentConfig(target: any) {
  return Reflect.getMetadata(AGENT_CONFIG_KEY, target);
}