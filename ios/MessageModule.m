//
//  MessageModule.m
//  linktest
//
//  Created by Ritesh Shakya on 11/29/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"


@interface RCT_EXTERN_MODULE(Message, RCTEventEmitter)
RCT_EXTERN_METHOD(
                  getUnreadCount: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(startListening)
RCT_EXTERN_METHOD(stopListening)
@end
