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
+ (instancetype) sharedInstance;

- (void)initSurvey:(NSDictionary *)launchOptions apiKey:(NSString *)apiKey;

// NOTE: For Demo App scenario. Remove before release
- (void)setupAPIKey:(NSString *)apiKey;


- (void)present:(UIViewController *)from surveyId:(NSString *)surveyId;
- (void)sendUploadOfflineFeedbacksEvent;
@end
