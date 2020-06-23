//
//  Dropthought.h
//  Dropthought
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface Dropthought : NSObject <RCTBridgeModule>
+ (_Nonnull instancetype) instance;

- (void)init:(NSDictionary * _Nullable)launchOptions apiKey:(NSString * _Nonnull)apiKey;
- (void)present:(UIViewController * _Nonnull)from surveyId:(NSString * _Nonnull)surveyId;
- (void)uploadOfflineFeedbacks;
@end
