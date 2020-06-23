//
//  Dropthought.m
//  Dropthought
//

#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import "Dropthought.h"
#import "SurveyApplication.h"
#import "SurveyEmitter.h"
#import "SurveyViewController.h"


@interface Dropthought()
@property (nonatomic, strong) UIViewController *from;
@property (nonatomic, strong) SurveyApplication *app;
@property (nonatomic, strong) NSString *apiKey;
@end

@implementation Dropthought

RCT_EXPORT_MODULE();

+ (_Nonnull instancetype)instance {
    static Dropthought *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[Dropthought alloc] init];
    });
    return instance;
}

- (void)init:(NSDictionary * _Nullable)launchOptions apiKey:(NSString * _Nonnull)apiKey {
    self.app = [[SurveyApplication alloc] init];
    [self.app setupBridge:launchOptions];
    self.apiKey = apiKey;

    [self uploadOfflineFeedbacks];
}

- (void)present:(UIViewController * _Nonnull)from surveyId:(NSString * _Nonnull)surveyId {
    self.from = from;

    NSDictionary *initialProperties = @{ @"apiKey" : self.apiKey, @"surveyId": surveyId };
    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:self.app.bridge moduleName:@"dropthought-sdk" initialProperties:initialProperties];
    rootView.frame = [UIScreen mainScreen].bounds;

    SurveyViewController *vc = [[SurveyViewController alloc] init];
    vc.view = rootView;
    vc.modalPresentationStyle = UIModalPresentationFullScreen;

    [self.from presentViewController:vc animated:YES completion:NULL];
}

- (void)uploadOfflineFeedbacks {
    [self.app.bridge enqueueJSCall:@"RCTDeviceEventEmitter" method:@"emit" args:@[@"UploadQueuedFeedback", @{@"apiKey": self.apiKey}] completion:NULL];
}


RCT_EXPORT_METHOD(dismiss)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [[Dropthought instance].from dismissViewControllerAnimated:YES completion:nil];
    });
}
@end
