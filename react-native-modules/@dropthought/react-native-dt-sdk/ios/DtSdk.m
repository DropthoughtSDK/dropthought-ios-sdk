#import "DtSdk.h"

@implementation DtSdk

RCT_EXPORT_MODULE()

- (NSDictionary *)constantsToExport {
  return @{ @"timeZone": [[NSTimeZone localTimeZone] name] };
}

+ (BOOL)requiresMainQueueSetup {
  return YES;
}
@end
