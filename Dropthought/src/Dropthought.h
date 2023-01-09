//
//  Dropthought.h
//  Dropthought
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface Dropthought : NSObject <RCTBridgeModule>
+ (_Nonnull instancetype) instance;

typedef NS_ENUM(NSInteger, Appearance) {
    System = 0,
    Light,
    Dark
};

- (void)init:(NSDictionary * _Nullable)launchOptions;
- (void)init:(NSDictionary * _Nullable)launchOptions apiKey:(NSString * _Nonnull)apiKey;
- (void)setupApiKey:(NSString * _Nonnull)apiKey;

- (void)present:(UIViewController * _Nonnull)from visibilityId:(NSString * _Nonnull)visibilityId;

- (void)present:(UIViewController * _Nonnull)from surveyId:(NSString * _Nonnull)surveyId;
- (void)present:(UIViewController * _Nonnull)from surveyId:(NSString * _Nonnull)surveyId appearance:(Appearance)appearance;
- (void)present:(UIViewController * _Nonnull)from surveyId:(NSString * _Nonnull)surveyId fontColor:(UIColor * _Nullable)fontColor backgroundColor:(UIColor * _Nullable)backgroundColor;
- (void)present:(UIViewController * _Nonnull)from surveyId:(NSString * _Nonnull)surveyId appearance:(Appearance)appearance fontColor:(UIColor * _Nullable)fontColor backgroundColor:(UIColor * _Nullable)backgroundColor;

- (void)setSurveyMetadata:(NSDictionary * _Nullable)metadata;
- (void)uploadOfflineFeedbacks;
@end
