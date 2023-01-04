# Dropthought iOS Sdk

This repository contains all Dropthought iOS SDK sources.

## Latest Version

-   4.2.0

There are two main repositories:

-   **Dropthought**

-   **react-native-modules**

And one ruby script for CocoaPods:

-   **dropthought_sdk_pods.rb**

The repository **Dropthought** contains the interfaces and functions for using Dropthought iOS SDK.

The repository **react-native-modules** contains the related react-native modules for Dropthought.

The ruby script **dropthought_sdk_pods.rb** contains all the CocoaPods scripts for install.

-   [Requirement](#Requirement)
-   [Installation](#Installation)
-   [Usage for Objective-C](#Usage-for-Objective-C)
-   [Usage for Swift](#Usage-for-Swift)

## Requirement

-   iOS 12.0+

## Precondition

Contact Customer Support at cs@dropthought.com to get help on how to publish your program through SDK.

## Installation

### Step 1. Download Source Files

Select Download ZIP to download source files to your computer.

<img src="https://github.com/DropthoughtSDK/dropthought-ios-sdk/raw/master/imgs/download.png" width="30%" height="30%">

### Step 2. Move/Copy Downloaded Repositories

Move/Copy these two repositories **Dropthought** and **react-native-modules** and **dropthought_sdk_pods.rb** file into your project root.  
Note: Same path/level as the **Podfile**

<img src="https://github.com/DropthoughtSDK/dropthought-ios-sdk/raw/master/imgs/repository.png" width="30%" height="30%">

### Step 3. Modify Your Podfile

We use CocoaPods to manage the SDK. You can find more detail about CocoaPods [here](https://cocoapods.org)  
Open your Podfile and paste following scripts into your project target.  
And execute **pod install**

```ruby
  /** add this line at the begining */
  require_relative './dropthought_sdk_pods.rb'
  
  platform :ios, '12.0'
  use_frameworks!

  target 'YourTargetName' do
    /** add this line to install dropthought sdk */
    use_dropthought_sdk
    
    /** other pods scripts */
  end
```

## Usage for Objective-C

### import Dropthought SDK

```objc
#import "Dropthought.h"
```

### AppDelegate.m

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.

    [[Dropthought instance] init:launchOptions apiKey:@"{YOUR_API_KEY}"];

    return YES;
}
```

### Open a survey from a view controller

```objc
// self represent a UIViewController where you what to present a survey
[[Dropthought instance] present:self surveyId:{SURVEY_ID}];
```

### Set Survey Metadata

```objc
[[Dropthought instance] setSurveyMetadata:(NSDictionary *)];
```

### Upload offline feedbacks

Dropthought SDK will cache user's feedbacks if there has no network connection.

You can call this function and we will check and submit again.

```objc
[[Dropthought instance] uploadOfflineFeedbacks];
```

## Usage for Swift

### import Dropthought SDK

```swift
import Dropthought
```

### AppDelegate.swift

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.

    Dropthought.instance().init(launchOptions, apiKey: "YOUR_API_KEY")

    return true
}
```

### Open a survey from a view controller

```swift
// self represent a UIViewController where you what to present a survey
Dropthought.instance().present(self, surveyId: "SURVEY_ID", theme: "default" | "light" | "dark", fontColor: "FONT_COLOR", backgroundColor: "BACKGROUND_COLOR")
```

### Set Survey Metadata

```swift
Dropthought.instance().setSurveyMetadata(metadata)
```

### Upload offline feedbacks

Dropthought SDK will cache user's feedbacks if there has no network connection.

You can call this function and we will check and submit again.

```swift
Dropthought.instance().uploadOfflineFeedbacks()
```
