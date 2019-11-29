//
//  MessageModule.swift
//  linktest
//
//  Created by Ritesh Shakya on 11/29/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import RxSwift

@objc(Message)
class Message: RCTEventEmitter {
  let E_UNREAD_ERROR: String = "E_UNREAD_ERROR";
  let C_UNREAD_EVENT: String = "EventUnread";
  var disposableEmitter: Disposable? = nil;
  
  @objc
  func getUnreadCount(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping  RCTPromiseRejectBlock
  ) -> Void {
    DispatchQueue.main.asyncAfter(deadline: .now() + 4) {
      resolve([11])
    }
  }
  
  override func constantsToExport() -> [AnyHashable : Any]! {
    return [C_UNREAD_EVENT: C_UNREAD_EVENT]
  }
  
  override func supportedEvents() -> [String]! {
    return [C_UNREAD_EVENT]
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return false
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
  
}
