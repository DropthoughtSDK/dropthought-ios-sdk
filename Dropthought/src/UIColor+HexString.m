//
//  UIColor+HexString.m
//  DropthoughtSDK-Objc
//
//  Created by BCT-Barney on 2021/11/5.
//  Copyright © 2021 bct.tpe. All rights reserved.
//

#import "UIColor+HexString.h"

@implementation UIColor (HexString)
- (NSString *) hexString {
    CGColorSpaceModel colorSpace = CGColorSpaceGetModel(CGColorGetColorSpace([self CGColor]));
    const CGFloat *components = CGColorGetComponents([self CGColor]);

    CGFloat r, g, b, a;

    if (colorSpace == kCGColorSpaceModelMonochrome) {
        r = components[0];
        g = components[0];
        b = components[0];
        a = components[1];
    } else {
        r = components[0];
        g = components[1];
        b = components[2];
        a = components[3];
    }

    return [NSString stringWithFormat:@"#%02lX%02lX%02lX%02lX",
            lroundf(r * 255),
            lroundf(g * 255),
            lroundf(b * 255),
            lroundf(a * 255)];
}
@end
