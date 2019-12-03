//
//  Navigation.swift
//  linktest
//
//  Created by Ritesh Shakya on 12/3/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation


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
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
