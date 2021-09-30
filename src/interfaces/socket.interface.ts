import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export interface ISocket extends Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap> {
  userID?: string
}
