//
//  MessageModule.m
//  linktest
//
//  Created by Ritesh Shakya on 11/29/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"


@interface RCT_EXTERN_REMAP_MODULE(Message, Message, NSObject)
RCT_EXTERN_METHOD(
                  getUnreadCount: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
@end
