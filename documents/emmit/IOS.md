# Introduction

Before getting started with this you should have a look at [Calling method from JavaScript](../method/IOS.md) if you haven't. This will be a continuation on the Module we already build there. 

But first, you need some adjustments to your current bridge. You should extend your class from `RCTEventEmitter` instead of `NSObject`, which is an abstract class from React Native:


    // Message.m
    
    #import "React/RCTBridgeModule.h"
    #import "React/RCTEventEmitter.h"
    
    @interface RCT_EXTERN_MODULE(Message, RCTEventEmitter)
    ...
    
Then, you should also import the `RCTEventEmitter` header in your Bridging-Header file, so you can use it in your Swift class:

    // linktest-Bridging-Header.h
    
    #import "React/RCTBridgeModule.h"
    #import "React/RCTEventEmitter.h"
    
Now, you can implement your Swift Event Emitter as follows:
- subclass `RCTEventEmitter`;
- implement `supportedEvents` and return a list of event names;
- call `sendEvent` to emit a specific event;
- override `constantsToExport` and `requiresMainQueueSetup` in case you have implemented them;

` Note: I'm using RxSwift to emulate an event. Basically it emmits once every 1 sec`


In this app, let’s emit start emitting the unread count when our RN component is mounted and stop emitting when its unmounted:

    // Message.swift
    
    @objc(Message)
    class Message: RCTEventEmitter {
      let C_UNREAD_EVENT: String = "EventUnread";
      var disposableEmitter: Disposable? = nil;    
      
      override func supportedEvents() -> [String]! {
        return [C_UNREAD_EVENT]
      }
        
      @objc
      func startListening() {
        if(disposableEmitter == nil){
          disposableEmitter = Observable<Int>.interval(.milliseconds(1000), scheduler: MainScheduler.instance)
            .subscribe({ longTimed in
              self.sendEvent(withName: self.C_UNREAD_EVENT, body: ["count": longTimed.element])
            });
        }
      }
      
      @objc
      func stopListening() {
        disposableEmitter?.dispose()
        disposableEmitter = nil
      }  
      
      override static func requiresMainQueueSetup() -> Bool {...}
      override func constantsToExport() -> [AnyHashable : Any]! {...}
     
    }

`Note: since use override, we don't need to specify the@objc directive.`

Next step would be to expose these to React Native’s bridge:

    // MessageModule.m
    
    RCT_EXTERN_METHOD(startListening)
    RCT_EXTERN_METHOD(stopListening)

Add a helper class for accessing the events.

    // Message.js
    
    import {NativeModules, NativeEventEmitter} from 'react-native';

    const eventEmitter = new NativeEventEmitter(NativeModules.Message);
    
    export const addUnreadListener = callback =>
      eventEmitter.addListener(Message.EventUnread, callback);


The final step is to subscribe to this event from JS.


    // Events/index.js 
    
    class EventsScreen extends Component {
        ...
        
        componentDidMount() {
            // instantiate the event emitter
            startListening();
            
            addUnreadListener(({count}) => {
                this.setState({
                    count,
                });
            });
        }
    
        componentWillUnmount() {
            // cleanup the event emitter
            stopListening();
        }
        ...
    }


    


