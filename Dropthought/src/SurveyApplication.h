//
//  SurveyApplication.h
//  Dropthought
//

#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
#import <React/RCTBridgeDelegate.h>

@interface SurveyApplication : UIResponder <RCTBridgeDelegate>
@property (nonatomic) RCTBridge *bridge;
- (void)setupBridge:(NSDictionary *)launchOptions;
@end
