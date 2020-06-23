//
//  SurveyEmitter.m
//  Dropthought
//

#import "SurveyEmitter.h"

@implementation SurveyEmitter

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
    return @[@"UploadQueuedFeedback"];
}

@end
