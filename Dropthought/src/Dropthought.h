//
//  Dropthought.h
//  Dropthought
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface Dropthought : NSObject <RCTBridgeModule>
+ (_Nonnull instancetype) instance;

typedef NS_ENUM(NSInteger, Theme) {
    ThemeSystem = 0,
    ThemeLight,
    ThemeDark
};

- (void)init:(NSDictionary * _Nullable)launchOptions apiKey:(NSString * _Nonnull)apiKey;

- (void)present:(UIViewController * _Nonnull)from surveyId:(NSString * _Nonnull)surveyId;
- (void)present:(UIViewController * _Nonnull)from surveyId:(NSString * _Nonnull)surveyId theme:(Theme)theme;
- (void)present:(UIViewController * _Nonnull)from surveyId:(NSString * _Nonnull)surveyId fontColor:(UIColor * _Nullable)fontColor backgroundColor:(UIColor * _Nullable)backgroundColor;
- (void)present:(UIViewController * _Nonnull)from surveyId:(NSString * _Nonnull)surveyId theme:(Theme)theme fontColor:(UIColor * _Nullable)fontColor backgroundColor:(UIColor * _Nullable)backgroundColor;

- (void)setSurveyMetadata:(NSDictionary * _Nullable)metadata;
- (void)uploadOfflineFeedbacks;//
@end
