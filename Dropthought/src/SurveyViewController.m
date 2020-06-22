//
//  SurveyViewController.m
//  DropthoughtSDK-Objc
//
//  Created by BCT-Barney on 2020/6/15.
//  Copyright © 2020 bct.tpe. All rights reserved.
//

#import "SurveyViewController.h"

@implementation SurveyViewController

- (UIInterfaceOrientationMask)supportedInterfaceOrientations {
    if ([UIDevice currentDevice].userInterfaceIdiom == UIUserInterfaceIdiomPhone) {
        return UIInterfaceOrientationMaskPortrait;
    } else {
        return UIInterfaceOrientationMaskAllButUpsideDown;
    }
}

@end
