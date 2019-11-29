//
//  MessageModule.swift
//  linktest
//
//  Created by Ritesh Shakya on 11/29/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation


@objc(Message)
class Message: NSObject {
  static let E_UNREAD_ERROR: String = "E_UNREAD_ERROR"

  
  @objc
  func getUnreadCount(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping  RCTPromiseRejectBlock
  ) -> Void {
    DispatchQueue.main.asyncAfter(deadline: .now() + 4) {
      resolve([11])
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
