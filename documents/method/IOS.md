# Introduction

Before implementing any type of communication, lets first visualize the flow in which we would access the data

`React (APP)` <- NativeModules <- `React Native (Module)` <- RCT_EXTERN_MODULE <- `Objective-C (Class)` <- @objc <- `Swift (Class)`

This signifies that item on the right exposes the methods to the item on the left with the help of the above protocols.

The main steps required for this include:

- How to expose a Swift class to JS
- How to expose static Swift data
- How to expose a Swift method
- How to expose a method with a callback
- How to expose a method as a Promise

### Configure the Objective-C Bridging Header

Let’s add one of the headers we will need right away:

    // linktest-Bridging-Header.h
    
    #import "React/RCTBridgeModule.h"

### Declare a Swift class

To begin with, let’s just create an empty class called `Message`. It should be inherited from `NSObject` so that it can be exposed to Obj-C:

// Message.swift
import Foundation

@objc(Message)
class Message: NSObject {
}

### How to expose a Swift class to JS

Next, you have to expose your Swift class to React Native. To do this, you need to use some Obj-C Macros available in React Native. Create a new Obj-C file and register our `Message` module.

    // MessageModule.m

    #import "React/RCTBridgeModule.h"

    @interface RCT_EXTERN_MODULE(Message, NSObject)
    @end

You also have to import `RCTBridgeModule`, so that you can use the Macros to bridge the native code.
You’ll use the `RCT_EXTERN_MODULE` Macro to expose your `Message` class to JS:

- the first argument is the name of your Swift class;
- the second is its superclass;

### Access your module from JS

Everything should be set up on the native side. Now let’s move on to the JavaScript side.
In your React Native project, `import NativeModules from 'react-native'` and let’s see if you can access your `Message` module:

    // index.js

    import { NativeModules } from 'react-native'
    console.log(NativeModules.Message)

Any module exposed to React Native should be available as a property on the `NativeModules` object.

### How to expose static Swift data

The most simple thing you can expose is static data. All you need to do is implement a special method, called `constantsToExport`, that returns a dictionary:

    // Message.swift

    import Foundation
    @objc(Message)
    class Message: NSObject {
      @objc
      func constantsToExport() -> [AnyHashable : Any]! {
        return [
              "number": 123.9,
              "string": "foo",
              "boolean": true,
              "array": [1, 22.2, "33"],
              "object": ["a": 1, "b": 2]
            ]
      }
    }

`Important: we need to use the @objc directive on each method / property that needs to be called or accessed from Obj-C.`

#### Main queue setup warning

You might get a warning telling you that you didn’t implement the `requiresMainQueueSetup` method. This happens when you use `constantsToExport` or have implemented an `init()` method for UIKit components in React Native v0.49+.

To suppress this warning, you simply have to implement the specified method, and return a Boolean:

- `true` if you need this class initialized on the main thread
- `false` if the class can be initialized on a background thread


    // Message.swift

    @objc(Message)
    class Message: NSObject {
      ...
      @objc
      static func requiresMainQueueSetup() -> Bool {
        return true
      }
    }

### How to expose a Swift method

Let’s see how you can call Swift code from JS by adding a `printUnread` method that gets the value we need.

    // Message.swift

    @objc(Message)
    class Message: NSObject {
      ...
      @objc
      func printHelloWorld() {
        print("Hello World")
      }
    }

`Important: we need to use the @objc directive on each method / property that needs to be called or accessed from Obj-C.`

Next you have to expose the method to React Native’s bridge, from your Obj-C file, using the `RCT_EXTERN_METHOD` Macro and passing the method name:

    // MessageModule.m
    
    ...
    @interface RCT_EXTERN_MODULE(Message, NSObject)
    RCT_EXTERN_METHOD(printHelloWorld)
    @end

Now, if you call your Swift method from JS, it should print `Hello World` in your Xcode output panel:

    // index.js
    
    ...
    NativeModules.Message.printHelloWorld()

### How to expose a Swift method with a callback

So far, you can call, from JS, some Swift methods that run native code. Next, let’s see how to get some data from Swift. Let’s create a new method that returns the unread count value:

    // Message.swift
    
    ...
      @objc
      func getUnreadCount(_ callback: RCTResponseSenderBlock) {
        callback([10])
      }
    ...

`Important: you need to pass an Array to your callback.`

Next, expose `getUnreadCount` to React Native’s bridge:

    // MessageModule.m
    
    ...
    RCT_EXTERN_METHOD(printHelloWorld)
    RCT_EXTERN_METHOD(getUnreadCount: (RCTResponseSenderBlock)callback)
    ...

And, finally, call it in your JS file, by passing a callback function:

    // index.js
    
    ...
    NativeModules.Message.getUnreadCount(value => {
      console.log("Unread Count: " + value)
    })

This should print `Unread Count: 10`, but this time in your JS console:

### How to expose a Swift promise

Well, there are no built-in Promises in Swift, but you can expose a method that you can call from JS just like a Promise.
Let’s change the `getUnreadCount` method that:

- **resolves** when we successfully get the count
- **rejects** otherwise.

Note I also added a delay so as to simulate fetching data from a remote server.

You have to use React Native’s types `RCTPromiseResolveBlock` and `RCTPromiseRejectBlock` and call the internal methods resolve() & reject() similarly to a JS Promise.

The `resolve` method has only 1 argument: the data that you want to resolve the Promise with.

The `reject` method has 3 arguments:

- **an error code**: something specific to your domain logic;
- **an error message**: the rejection reason;
- **a NSError object**: this is usually the error object you get when a network request fails;


    // Message.swift
    
    ...
    @objc
    func getUnreadCount(
      _ resolve: @escaping RCTPromiseResolveBlock,
      rejecter reject: @escaping  RCTPromiseRejectBlock
    ) -> Void {
      if(Int.random(in: 0..<6) < 3){
          DispatchQueue.main.asyncAfter(deadline: .now() + 4) {
              resolve([10])
          }
      } else {
        let error = NSError(domain: "", code: 200, userInfo: nil)
        reject("E_COUNT", "count not fetch from server", error)
      }
    }
    ...

Next, you need to expose this method to React Native’s bridge:

    // MessageModule.m
    
    ...
    RCT_EXTERN_METHOD(
      getUnreadCount: (RCTPromiseResolveBlock)resolve
      rejecter: (RCTPromiseRejectBlock)reject
    )
    ...

Finally, you can use it in your JS file by creating a function that wraps the Promise call and error handling:

    // index.js

    NativeModules.Message.getUnreadCount().then(count => {
        console.log("Unread Count: " + value)
    }, error => {
        console.warn(error);
    });

The above code would either return you `Unread Count: 10` or error out `Error: count not fetch from server` depending on the random number generation.

## Argument Types

`RCT_EXPORT_METHOD` supports all standard JSON object types, such as:

- **string** (NSString)
- **number** (NSInteger, float, double, CGFloat, NSNumber)
- **boolean** (BOOL, NSNumber)
- **array** (NSArray) of any types from this list
- **object** (NSDictionary) with string keys and values of any type from this list
- **function** (RCTResponseSenderBlock)

But it also works with any type that is supported by the `RCTConvert` class (see [RCTConvert](https://github.com/facebook/react-native/blob/master/React/Base/RCTConvert.h) for details). The `RCTConvert` helper functions all accept a JSON value as input and map it to a native Objective-C type or class.
