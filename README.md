# Introduction

This is a test project which demonstrates how we could create bridge with React Native to establish communication to and from React Native to Native Codebase.

This React Native project will guide you through integrating React Native into an existing iOS/Android application. This documentation assumes you already know a fair bit about the respective Native Platforms so I will probably skip through some of them.

# Native Modules

The first aim of the project is to reuse some existing Objective-C/Swift or Java/Kotlin code without having to reimplement it in JavaScript. This can further be divided into two different usecases.

## Calling method from JavaScript

This guide will use the Unread Message Count example. Let's say we would like to display the no of unread messages in our React Native code and the logic for this already exists on the Native side. So we would simply like to call this method from JavaScript.

We start by creating a native module. A native module is a class that usually extends the RCTBridgeModule/ReactContextBaseJavaModule and implements the functionality required by the JavaScript. Our goal here is to be able to write `Message.getUnreadCount();` from JavaScript to display this count on the screen.

For step by step implementation please check out guide for [iOS](/documents/method/IOS.md) and [android](/documents/method/ANDROID.md)


## Emitting data to JavaScript

You’ll often find it useful to be able to subscribe from JS to certain events that occur on the native side. For this, you’ll need an Event Emitter. In this guide like earlier we will use the Unread Message Count example. For example the unread count may increase after the RN view has been displayed, for cases like this an event plays a important role in notifying RN about the changes. 

The process is pretty similar to a PubSub model where the Native code publishes the data and React Native subscribes for the update

For step by step implementation please check out guide for [iOS](/documents/emmit/IOS.md) and [android](/documents/emmit/ANDROID.md)


# Navigation

The second aim of this project is to setup navigation between RN and native in a seamless manner. What we need to understand first and foremost about react native is that React Native is essentially native. React Native consists of Javascript code controlling Native UI. An <Image /> React component will display a native `UIImage` on iOS or a native `ImageView` on Android.

So React Native is essentially Native! If you open your React Native app in the XCode hierarchy inspector or the Android Studio one, you'll indeed see the Native UI components. 

The first challenge that we need to tackle is how to handle navigation.

When using React Native, the officially recommended solution for navigating between screens is react-navigation. But it’s a full javascript solution so that’s not a good fit here. For instance, you might want to have a hybrid navigation stack like so:

- your app opens with a native screen
- you push a native screen
- then you push a React screen
- then push another React screen from it
- then let's say from this React screen, you want to push back to a native screen.

`Native Screen` -> `Native Screen` -> `React Native` -> `React Native` -> `Native Screen`


## Navigating from RN to native

To accomplish this we will be leveraging `Native Module` so please have a look at the above implementation on this. Basically we would be calling a method in Native Code that would just behave as a Native Navigation for iOS (change `View` or `ViewController`) or Android (change `Activity`)

For step by step implementation please check out guide for [iOS](/documents/navigation_native/IOS.md) and [android](/documents/navigation_native/ANDROID.md)

## Navigation from native to RN

For step by step implementation please check out guide for [iOS](/documents/navigation_rn/IOS.md) and [android](/documents/navigation_rn/ANDROID.md)


