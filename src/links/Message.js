import {NativeModules, NativeEventEmitter} from 'react-native';
const Message = NativeModules.Message;

export const getUnreadCount = Message.getUnreadCount;

export const startListening = Message.startListening;

export const stopListening = Message.stopListening;

const eventEmitter = new NativeEventEmitter(Message);

export const addUnreadListener = callback =>
  eventEmitter.addListener(Message.EventUnread, callback);
