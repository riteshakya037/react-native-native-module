# Introduction

Earlier we saw how the bridge helped manage communications between native and JavaScript ([Native Module](../method/IOS.md)). For example, the `View` component made JavaScript calls through the bridge to an `Objective-C\Swift` class that eventually displayed a unread counter. Thus React Native provides you with hooks to build custom native modules that JavaScript can call. 

In this project we will see two such examples where we could use `Native Modules` to assist in navigation.  

## Create a global extension to get Top most ViewController

We create a nifty extension on `UIApplication` to get the top most `UIViewController`. This is later be useful when we have to dismiss or replace this `UIViewController`.


    // AppDelegate.swfit
    
    extension UIApplication {
    
        class func topMostViewController(controller: UIViewController? = UIApplication.shared.keyWindow?.rootViewController) -> UIViewController? {
    
            if let navigationController = controller as? UINavigationController {
                return topMostViewController(controller: navigationController.visibleViewController)
            }
    
            if let tabController = controller as? UITabBarController {
                if let selected = tabController.selectedViewController {
                    return topMostViewController(controller: selected)
                }
            }
    
            if let presented = controller?.presentedViewController {
                return topMostViewController(controller: presented)
            }
    
            return controller
        }
    }


## Creating Native UIViewController

This step is pretty straight forward, create a `UIViewController` `NativeDemoViewController.swift` and link it to XML Interface Builder `NativeDemoViewController.xib`

    // NativeDemoViewController.swift
    
    class NativeDemoViewController: UIViewController  {
        ...
    }


## Creating Navigation Module

Create a new, empty Swift file named `Navigation.swift` and replace its contents with the following:


    //  Navigation.swift
    
    @objc(Navigation)
    class Navigation: NSObject {
      
      @objc
      func navigateTo(_ destination: NSString) -> Void {
        let modelVC: UIViewController;
        switch destination {
        case "NativeDemo":
          modelVC = NativeDemoViewController()
        default:
          return;
        }
        DispatchQueue.main.async {
          let navController = UINavigationController(rootViewController: modelVC)
          navController.modalPresentationStyle = .fullScreen
          let topController = UIApplication.topMostViewController()
          topController?.present(navController, animated: true, completion: nil)
        }
      }
      
      @objc
       func goBack() -> Void {
         DispatchQueue.main.async {
           let topController = UIApplication.topMostViewController()
           topController?.dismiss(animated: true, completion: nil)
         }
       }
      ...
    }

The first method `navigateTo(_:)` takes in a string parameter which is used to redirect the App to the required screen. In our case we only have one destination `NativeDemo`, of all other cases the function does nothing. The implementation is pretty straight forward create the required `UIViewController` and replace with the current topmost one. 

Important: If we need to pass some arguments to the new ViewController, it would similar to the implementation in [Native Module](../method/IOS.md) so please have look at it

This class contains `goBack()` which when executed (on the main thread), finds the top most view controller and then dismisses it.

Next we'll have to create a bridge implementation to make your module known to the bridge.
     
Create a new, empty Objective-C file named `NavigationModule.m`. Add the following content to `NavigationModule.m`:
                                                                 

    //  NavigationModule.m
    
    #import <Foundation/Foundation.h>
    #import "React/RCTBridgeModule.h"
    
    
    @interface RCT_EXTERN_MODULE(Navigation, NSObject)
    RCT_EXTERN_METHOD(navigateTo: (NSString)destination)
    RCT_EXTERN_METHOD(goBack)
    @end

Your next task is to add a helper class in JavaScript to wire up the calls to native code.

Since we are using another library of internal RN navigation we need to address this as well. One way would be to give first priority to `react-nativation`. 

    // Navigation.js
    
    import {NativeModules} from 'react-native';
    const Navigation = NativeModules.Navigation;
    
    export const navigateTo = Navigation.navigateTo;
    
    export const goBack = ({navigation: {goBack: RNGoBack} = {}}) => {
      if (RNGoBack) {
        RNGoBack();
      } else {
        Navigation.goBack();
      }
    };
    
Now its a simple matter of calling `navigateTo` with the required destination as arguments to move from RN to Native Screens. Similarly calling `goBack()` supplied by the current props takes necessary action of going back one screen.
