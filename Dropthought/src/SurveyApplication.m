//
//  SurveyApplication.m
//  Dropthought
//

#import "SurveyApplication.h"

@implementation SurveyApplication

- (void)setupBridge:(NSDictionary *)launchOptions {
    self.bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
    NSBundle *bundle = [NSBundle bundleForClass:[SurveyApplication class]];
    NSURL *bundleURL = [bundle URLForResource:@"main" withExtension:@"bundle"];
    NSURL *jsbundleLocation = [[NSBundle bundleWithURL:bundleURL] URLForResource:@"main" withExtension:@"jsbundle"];
    return jsbundleLocation;
}
@end
