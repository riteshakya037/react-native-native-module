# Introduction

The first thing you need to understand before getting started with this is the concept of `RCTRootView` and how app `AppRegistry.registerComponent` plays a integral part in bridging our RN screens to `RCTRootView`.

`RCTRootView` is a Native view used to host React-managed views within the app. It can be used just like any ordinary `UIView`. You can have multiple `RCTRootView`s on screen at once, all controlled by the same JavaScript application. But the scope of this project only focuses on using one view per `ViewController` i.e one View per screen.

With this in mind `AppRegistry.registerComponent` helps us register such entry components which needs to be managed by `RCTRootView`. In other words all points that need to be navigated from Native should have its components registered with `AppRegistry.registerComponent`.

AppRegistry should be required early in the require sequence to make sure the JS execution environment is setup before other modules are required.

## Registering Entry Points

Like mentioned above we need to define the entry points for our React screens. Add the following in `index.js`.

    // index.js

    import {AppRegistry} from 'react-native';
    import MainApp from './MainApp';
    import ProfileScreen from './src/screens/ProfileScreen';

    AppRegistry.registerComponent('MAIN', () => MainApp);
    AppRegistry.registerComponent('PROFILE', () => ProfileScreen);

The above code registers two entry points `MAIN` and `PROFILE`, corresponding to components `MainApp` and `ProfileScreen` respectively.

## Create a global extension to get Top most ViewController

Skip this if you have already created this in the [Navigating from RN to native](../navigation_native/IOS.md)). We create a nifty extension on `UIApplication` to get the top most `UIViewController`. This is later be useful when we have to dismiss or replace this `UIViewController`.


    // AppDelegate.swfit

    extension UIApplication {

        class func topMostViewController(controller: UIViewController? = UIApplication.shared.keyWindow?.rootViewController) -> UIViewController?   
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

## Creating Native UIViewController and binding actions

This step is pretty straight forward, create a `UIViewController` `NativeDemoViewController.swift` and link it to XML Interface Builder `NativeDemoViewController.xib`

    // NativeDemoViewController.swift

    class NativeDemoViewController: UIViewController  {
        ...
    }

Now lets add two buttons from the Interface Builder and bind them to the two methods below.

    // NativeDemoViewController.swift

    class NativeDemoViewController: UIViewController  {

        @IBAction func onGoBack(_ sender: UIButton) {

        }

        @IBAction func onMoveForward(_ sender: UIButton) {

        }
    }

## Navigating Back

This step is just a matter of dismissing the current `ViewController`. Lets add this to the code.

    // NativeDemoViewController.swift

    class NativeDemoViewController: UIViewController  {

        @IBAction func onGoBack(_ sender: UIButton) {
            self.dismiss(animated: true, completion: nil)
        }
        ...
    }

## Navigation to React Native Component

This is the same process as when we create a React Native only application and bind the `rootViewController` in `window`.

Lets extract the steps in `application` in `AppDelegate.swift` where we construct out `viewController`.

    //  AppDelegate.swift

    @UIApplicationMain
    class AppDelegate: UIResponder, UIApplicationDelegate {
        var window: UIWindow?
        var bridge: RCTBridge!
        let jsCodeLocation: URL = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource:nil)

        func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
            let rootViewController = getVCFromModuleName("MAIN", nil, launchOptions)

            self.window = UIWindow(frame: UIScreen.main.bounds)
            self.window?.rootViewController = rootViewController
            self.window?.makeKeyAndVisible()

            return true
        }


        func getVCFromModuleName(_ moduleName: String,_ initialProperties: NSDictionary?, _ launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> UIViewController {
            var props: [NSObject : AnyObject]? = nil
            if (initialProperties != nil) {
              props = initialProperties! as [NSObject : AnyObject]
            }
            let rootView = RCTRootView(bundleURL: jsCodeLocation, moduleName: moduleName, initialProperties: props , launchOptions: launchOptions)
            let rootViewController = UIViewController()

            rootViewController.view = rootView
            return rootViewController
        }
    }

In the code above method `getVCFromModuleName` creates a `UIViewController` and sets its `view` attribute as the newly created `RCTRootView`. This initializes an instance of `RCTRootView` with the app bundle served up from `index.js`. It configures `moduleName` as module name to run initially along with `initialProperties` and `launchOptions` provided as arguments to the method.

Next we would want to add a method that would help us navigate to a specific RN Component as the above method only helps in creating the required `UIViewController`.

    //  AppDelegate.swift

    @UIApplicationMain
    class AppDelegate: UIResponder, UIApplicationDelegate {
        ...

        func navigateToRN(_ moduleName: String,_ initialProperties: NSDictionary?, _ launchOptions: [UIApplication.LaunchOptionsKey: Any]?) {
            let vc = getVCFromModuleName(moduleName, initialProperties, launchOptions)
            DispatchQueue.main.async {
                let navController = UINavigationController(rootViewController: vc)
                navController.modalPresentationStyle = .fullScreen
                navController.setNavigationBarHidden(true, animated: false)
                let topController = UIApplication.topMostViewController()
                topController?.present(navController, animated: true, completion: nil)
            }
        }
    }
    
Now its just a matter of calling this method when we need to switch to a particular React Native Screen that we registered above. Lets add the logic to navigate to `ProfileScreen` from `NativeDemo`.

 
    //  NativeDemoViewController.swift
    
    class NativeDemoViewController: UIViewController  {
        ...
        @IBAction func onMoveForward(_ sender: UIButton) {
            if let appDelegate: AppDelegate = UIApplication.shared.delegate as? AppDelegate{
                appDelegate.navigateToRN("PROFILE", nil, nil)
            }
        }
    }
    


### Passing props to React Native 

Most of the time you would want to pass props to React Native to provide initial data or some form of constant that it requires to function. We have already this up in previous screen its just a matter of adding in the logic to `NativeDemoViewController.swift`


    //  NativeDemoViewController.swift
      
    class NativeDemoViewController: UIViewController  {
        ...
        @IBAction func onMoveForward(_ sender: UIButton) {
            let mockData:NSDictionary = ["userId":"B139DF2B-E4A1-4D30-A838-FEA195167092"]
            if let appDelegate: AppDelegate = UIApplication.shared.delegate as? AppDelegate{
                appDelegate.navigateToRN("PROFILE", mockData, nil)
            }
        }
    }
    
Accessing the props in React Native is the same as any props that would have been passed by its parent. And we could access the `userId` passed above simply by calling `const { userId } = this.props` in the component. 
