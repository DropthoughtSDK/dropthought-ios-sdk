//
//  SurveyApplication.h
//  DropthoughtSDK-Objc
//
//  Created by BCT-Barney on 2020/6/5.
//  Copyright © 2020 bct.tpe. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
#import <React/RCTBridgeDelegate.h>

@interface SurveyApplication : UIResponder <RCTBridgeDelegate>
@property (nonatomic) RCTBridge *bridge;

- (void)setupBridge:(NSDictionary *)launchOptions;
@end
