//
//  NavigationModule.m
//  linktest
//
//  Created by Ritesh Shakya on 12/3/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"


@interface RCT_EXTERN_MODULE(Navigation, NSObject)
RCT_EXTERN_METHOD(navigateTo: (NSString)destination)
RCT_EXTERN_METHOD(goBack)
@end
