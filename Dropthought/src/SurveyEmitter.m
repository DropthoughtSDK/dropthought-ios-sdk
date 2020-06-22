//
//  SurveyEmitter.m
//  DropthoughtSDK-Objc
//
//  Created by BCT-Barney on 2020/6/10.
//  Copyright © 2020 bct.tpe. All rights reserved.
//

#import "SurveyEmitter.h"

@implementation SurveyEmitter

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
    return @[@"UploadQueuedFeedback"];
}

@end
