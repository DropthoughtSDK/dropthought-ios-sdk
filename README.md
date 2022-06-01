# Dropthought iOS Sdk

This repository contains all Dropthought iOS SDK sources.

## Latest Version

-   4.0.0

There are two main repositories:

-   **Dropthought**

-   **react-native-modules**

The repository **Dropthought** contains the interfaces and functions for using Dropthought iOS SDK.

The repository **react-native-modules** contains the related react-native modules for Dropthought.

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

Move/Copy these two repositories **Dropthought** and **react-native-modules** into your project root.  
Note: Same path/level as the **Podfile**

<img src="https://github.com/DropthoughtSDK/dropthought-ios-sdk/raw/master/imgs/repository.png" width="30%" height="30%">

### Step 3. Modify Your Podfile

We use CocoaPods to manage the SDK. You can find more detail about CocoaPods [here](https://cocoapods.org)  
Open your Podfile and paste following scripts into your project target.  
And execute **pod install**

```ruby
  use_frameworks!

  pod 'Dropthought', :path => './Dropthought'

  react_native_modules_path = './react-native-modules/'
  pod 'FBLazyVector', :path => react_native_modules_path + 'react-native/Libraries/FBLazyVector'
  pod 'FBReactNativeSpec', :path => react_native_modules_path + 'react-native/Libraries/FBReactNativeSpec'
  pod 'RCTRequired', :path => react_native_modules_path + 'react-native/Libraries/RCTRequired'
  pod 'RCTTypeSafety', :path => react_native_modules_path + 'react-native/Libraries/TypeSafety'
  pod 'React', :path => react_native_modules_path + 'react-native/'
  pod 'React-Core', :path => react_native_modules_path + 'react-native/'
  pod 'React-CoreModules', :path => react_native_modules_path + 'react-native/React/CoreModules'
  pod 'React-Core/DevSupport', :path => react_native_modules_path + 'react-native/'
  pod 'React-RCTActionSheet', :path => react_native_modules_path + 'react-native/Libraries/ActionSheetIOS'
  pod 'React-RCTAnimation', :path => react_native_modules_path + 'react-native/Libraries/NativeAnimation'
  pod 'React-RCTBlob', :path => react_native_modules_path + 'react-native/Libraries/Blob'
  pod 'React-RCTImage', :path => react_native_modules_path + 'react-native/Libraries/Image'
  pod 'React-RCTLinking', :path => react_native_modules_path + 'react-native/Libraries/LinkingIOS'
  pod 'React-RCTNetwork', :path => react_native_modules_path + 'react-native/Libraries/Network'
  pod 'React-RCTSettings', :path => react_native_modules_path + 'react-native/Libraries/Settings'
  pod 'React-RCTText', :path => react_native_modules_path + 'react-native/Libraries/Text'
  pod 'React-RCTVibration', :path => react_native_modules_path + 'react-native/Libraries/Vibration'
  pod 'React-Core/RCTWebSocket', :path => react_native_modules_path + 'react-native/'
  pod 'React-cxxreact', :path => react_native_modules_path + 'react-native/ReactCommon/cxxreact'
  pod 'React-jsi', :path => react_native_modules_path + 'react-native/ReactCommon/jsi'
  pod 'React-jsiexecutor', :path => react_native_modules_path + 'react-native/ReactCommon/jsiexecutor'
  pod 'React-jsinspector', :path => react_native_modules_path + 'react-native/ReactCommon/jsinspector'
  pod 'ReactCommon/callinvoker', :path => react_native_modules_path + 'react-native/ReactCommon'
  pod 'ReactCommon/turbomodule/core', :path => react_native_modules_path + 'react-native/ReactCommon'
  pod 'Yoga', :path => react_native_modules_path + 'react-native/ReactCommon/yoga', :modular_headers => true
  pod 'DoubleConversion', :podspec => react_native_modules_path + 'react-native/third-party-podspecs/DoubleConversion.podspec'
  pod 'glog', :podspec => react_native_modules_path + 'react-native/third-party-podspecs/glog.podspec'
  pod 'Folly', :podspec => react_native_modules_path + 'react-native/third-party-podspecs/Folly.podspec'
  pod 'RNGestureHandler', :path => react_native_modules_path + 'react-native-gesture-handler'
  pod 'react-native-safe-area-context', :path => react_native_modules_path + 'react-native-safe-area-context'
  pod 'RNCAsyncStorage', :path => react_native_modules_path + '@react-native-community/async-storage'
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
