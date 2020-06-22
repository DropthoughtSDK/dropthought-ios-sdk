//
//  Survey.h
//  DropthoughtSDK-Objc
//
//  Created by BCT-Barney on 2020/6/4.
//  Copyright © 2020 bct.tpe. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface Survey : NSObject <RCTBridgeModule>
+ (_Nonnull instancetype) sharedInstance;

- (void)initSurvey:(NSDictionary * _Nullable)launchOptions apiKey:(NSString * _Nonnull)apiKey;

// NOTE: For Demo App scenario. Remove before release
- (void)setupAPIKey:(NSString * _Nonnull)apiKey;


- (void)present:(UIViewController * _Nonnull)from surveyId:(NSString * _Nonnull)surveyId;
- (void)sendUploadOfflineFeedbacksEvent;
@end
