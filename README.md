# Dropthought iOS Sdk

This repository contains all Dropthought iOS SDK sources.

## Latest Version

-   5.2.0

## Features

-   Multiple open question
-   Matrix rating
-   Dropdown
-   Rating slider
-   Ranking

## Requirement

-   iOS 12.0+

## Precondition

Contact Customer Support at cs@dropthought.com to get help on how to publish your program through SDK.

## Installation

### Step 1. Download Source Files

Select Download ZIP to download source files to your computer.

<img src="https://github.com/DropthoughtSDK/dropthought-ios-sdk/raw/master/imgs/download.png" width="30%" height="30%">

</br>

### Step 2. Move/Copy Downloaded Repositories

Move/Copy these two repositories **Dropthought** and **react-native-modules** into your project root.  
Note: Same path/level as the **Podfile**

<img src="https://github.com/DropthoughtSDK/dropthought-ios-sdk/raw/master/imgs/repository.png" width="40%" height="40%">

</br>

**There are two main repositories:**

-   **Dropthought**

-   **react-native-modules**

The repository **Dropthought** contains the interfaces and functions for using Dropthought iOS SDK.

The repository **react-native-modules** contains the related react-native modules for Dropthought.

-   [Requirement](#Requirement)
-   [Installation](#Installation)
-   [Usage for Swift](#Usage-for-Swift)
-   [Usage for Objective-C](#Usage-for-Objective-C)

</br>

### Step 3. Modify Your Podfile

We use CocoaPods to manage the SDK. You can find more detail about CocoaPods [here](https://cocoapods.org)  
Open your Podfile and paste following scripts into your project target.  
And execute `pod install`

```diff
+ require_relative './dropthought_sdk_pods.rb'

platform :ios, '12.0'

use_frameworks!

target '{your_project_target}' do

+  use_dropthought_sdk

   {...}

end

```

</br>

## Usage for Swift

</br>

### import Dropthought SDK

Note: You need to import `Dropthought` whenever you want to use our SDK

```swift
import Dropthought
```

</br>

### Initialize our SDK

</br>

Note: You can find you API key in the web dashboard. (If you don't have permission, please contact your admin)

<img src="https://github.com/DropthoughtSDK/dropthought-ios-sdk/raw/master/imgs/image_apiKey.jpeg">

</br>

In AppDelegate.swift

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    // Add this line to init our SDK
    Dropthought.instance().init(launchOptions, apiKey: "YOUR_API_KEY")

    // ...

    return true
}
```

</br>

### Open a survey from a view controller

```swift
// self represent a UIViewController where you what to present a survey
Dropthought.instance().present(self, visibilityId: "YOUR_VISIBILITY_ID")
```

Note: You can find and copy your visibility ID here in Enterprise app

<img src="https://github.com/DropthoughtSDK/dropthought-ios-sdk/raw/master/imgs/image_visibility.jpeg">

</br>
</br>

## Additional features

### - Set Survey Metadata

If you want to append metadata to each feedback. You can call this function before you open the survey

```swift
Dropthought.instance().setSurveyMetadata(metadata)
```

For example

```swift
Dropthought.instance().setSurveyMetadata(["name": "Barney", "age": "36"])
```

</br>

### - Upload offline feedbacks

Dropthought SDK will cache user's feedbacks if there has no network connection.
You can call this function and we will check if there's any cached feedbacks and submit them again.

When user finishes a survey under no network or a bad network, the survey feedback is saved offline. Dropthought SDK will try to upload the offline feedbacks(if any) when app start.

Or, you could call

```swift
Dropthought.instance().uploadOfflineFeedbacks()
```

manually to try to upload the saved results once if your app has network status monitor.
</br>
</br>

## Usage for Objective-C

</br>

### import Dropthought SDK

Note: You need to import `Dropthought.h` whenever you want to use our SDK

```objc
#import "Dropthought.h"
```

</br>

### Initialize our SDK

</br>

Note: You can find you API key in the web dashboard. (If you don't have permission, please contact your admin)

<img src="https://github.com/DropthoughtSDK/dropthought-ios-sdk/raw/master/imgs/image_apiKey.jpeg">

</br>

In AppDelegate.m

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    // Add this line to init our SDK
    [[Dropthought instance] init:launchOptions apiKey:@"{YOUR_API_KEY}"];

    // ...

    return YES;
}
```

</br>

### Open a survey from a view controller

```objc
// self represent a UIViewController where you what to present a survey
[[Dropthought instance] present:self visibilityId:@"{YOUR_VISIBILITY_ID}"];
```

Note: You can find and copy your visibility ID here in Enterprise app

<img src="https://github.com/DropthoughtSDK/dropthought-ios-sdk/raw/master/imgs/image_visibility.jpeg">

</br>

### - Set Survey Metadata

Note: If you want to append metadata to each feedback. You can call this function before you open the survey

```objc
[[Dropthought instance] setSurveyMetadata:(NSDictionary *)];
```

e.g.

```objc
NSDictionary *metadata = @{ @"name": @"Barney", @"age": @"36" };
[[Dropthought instance] setSurveyMetadata:metadata];
```

</br>

### - Upload offline feedbacks

Dropthought SDK will cache user's feedbacks if there has no network connection.
You can call this function and we will check if there's any cached feedbacks and submit them again.

When user finishes a survey under no network or a bad network, the survey feedback is saved offline. Dropthought SDK will try to upload the offline feedbacks(if any) when app start.

Or, you could call

```objc
[[Dropthought instance] uploadOfflineFeedbacks];
```

manually to try to upload the saved results once if your app has network status monitor.
