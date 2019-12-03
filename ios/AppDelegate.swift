//
//  AppDelegate.swift
//  linktest
//
//  Created by Ritesh Shakya on 12/3/19.
//  Copyright © 2019 Facebook. All rights reserved.
//
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
    let rootView = RCTRootView(bundleURL: jsCodeLocation, moduleName: moduleName, initialProperties:props , launchOptions: launchOptions)
    let rootViewController = UIViewController()
    
    rootViewController.view = rootView
    return rootViewController
  }
  
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
