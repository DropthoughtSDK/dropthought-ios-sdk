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
#import "UIColor+HexString.h"


@interface Dropthought()
@property (nonatomic, strong) UIViewController *from;
@property (nonatomic, strong) SurveyApplication *app;
@property (nonatomic, strong) NSString *apiKey;
@property (nonatomic, strong) NSDictionary *metadata;
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

- (void)init:(NSDictionary * _Nullable)launchOptions {
    self.app = [[SurveyApplication alloc] init];
    [self.app setupBridge:launchOptions];
}

- (void)init:(NSDictionary * _Nullable)launchOptions apiKey:(NSString * _Nonnull)apiKey {
    self.app = [[SurveyApplication alloc] init];
    [self.app setupBridge:launchOptions];
    self.apiKey = apiKey;

    [self uploadOfflineFeedbacks];
}

- (void)setupApiKey:(NSString * _Nonnull)apiKey {
    self.apiKey = apiKey;
}

- (void)present:(UIViewController * _Nonnull)from visibilityId:(NSString * _Nonnull)visibilityId {
    self.from = from;

    NSMutableDictionary *initialProperties = [NSMutableDictionary new];
    [initialProperties setObject:self.apiKey forKey:@"apiKey"];
    [initialProperties setObject:visibilityId forKey:@"visibilityId"];
    
    if (self.metadata != NULL) {
        [initialProperties setObject:self.metadata forKey:@"metadata"];
    }

    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:self.app.bridge moduleName:@"dropthought-sdk" initialProperties:initialProperties];
    rootView.frame = [UIScreen mainScreen].bounds;

    SurveyViewController *vc = [[SurveyViewController alloc] init];
    vc.view = rootView;
    vc.modalPresentationStyle = UIModalPresentationFullScreen;

    [self.from presentViewController:vc animated:YES completion:NULL];
}

- (void)present:(UIViewController * _Nonnull)from surveyId:(NSString * _Nonnull)surveyId {
    [self present:from surveyId:surveyId appearance:System fontColor:NULL backgroundColor:NULL];
}

- (void)present:(UIViewController * _Nonnull)from surveyId:(NSString * _Nonnull)surveyId appearance:(Appearance)appearance {
    [self present:from surveyId:surveyId appearance:appearance fontColor:NULL backgroundColor:NULL];
}

- (void)present:(UIViewController * _Nonnull)from surveyId:(NSString * _Nonnull)surveyId fontColor:(UIColor * _Nullable)fontColor backgroundColor:(UIColor * _Nullable)backgroundColor {
    [self present:from surveyId:surveyId appearance:System fontColor:fontColor backgroundColor:backgroundColor];
}

- (void)present:(UIViewController * _Nonnull)from surveyId:(NSString * _Nonnull)surveyId appearance:(Appearance)appearance fontColor:(UIColor * _Nullable)fontColor backgroundColor:(UIColor * _Nullable)backgroundColor {
    if (self.apiKey.length == 0) {
        return;
    }
    self.from = from;

    NSMutableDictionary *initialProperties = [NSMutableDictionary new];
    [initialProperties setObject:self.apiKey forKey:@"apiKey"];
    [initialProperties setObject:surveyId forKey:@"surveyId"];
    switch (appearance) {
        case System:
            [initialProperties setObject:@"system" forKey:@"appearance"];
            break;
        case Light:
            [initialProperties setObject:@"light" forKey:@"appearance"];
            break;
        case Dark:
            [initialProperties setObject:@"dark" forKey:@"appearance"];
            break;
    }

    if (fontColor != NULL) {
        [initialProperties setObject:[fontColor hexString] forKey:@"fontColor"];
    }
    if (backgroundColor != NULL) {
        [initialProperties setObject:[backgroundColor hexString] forKey:@"backgroundColor"];
    }

    if (self.metadata != NULL) {
        [initialProperties setObject:self.metadata forKey:@"metadata"];
    }

    [initialProperties setObject:@"classic" forKey:@"themeOption"];
    
    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:self.app.bridge moduleName:@"dropthought-sdk" initialProperties:initialProperties];
    rootView.frame = [UIScreen mainScreen].bounds;

    SurveyViewController *vc = [[SurveyViewController alloc] init];
    vc.view = rootView;
    vc.modalPresentationStyle = UIModalPresentationFullScreen;

    [self.from presentViewController:vc animated:YES completion:NULL];
}

- (void)setSurveyMetadata:(NSDictionary * _Nullable)metadata {
    self.metadata = metadata;
}

- (void)uploadOfflineFeedbacks {
    if (self.apiKey.length > 0) {
        [self.app.bridge enqueueJSCall:@"RCTDeviceEventEmitter" method:@"emit" args:@[@"UploadQueuedFeedback", @{@"apiKey": self.apiKey}] completion:NULL];
    }
}

RCT_EXPORT_METHOD(dismiss)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [[Dropthought instance].from dismissViewControllerAnimated:YES completion:nil];
    });
}
@end
