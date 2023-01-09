def use_dropthought_sdk
    
    # for actual user usage
    # pod 'Dropthought', :path => './Dropthought'

    # for local testing usage
    pod 'Dropthought', :path => '../iosSDK'
  
    # The prefix to the react-native
    prefix = "./react-native-modules/react-native"

     # The Pods which should be included in all projects
    pod 'FBLazyVector', :path => "#{prefix}/Libraries/FBLazyVector"
    pod 'FBReactNativeSpec', :path => "#{prefix}/Libraries/FBReactNativeSpec"
    pod 'RCTRequired', :path => "#{prefix}/Libraries/RCTRequired"
    pod 'RCTTypeSafety', :path => "#{prefix}/Libraries/TypeSafety"
    pod 'React', :path => "#{prefix}/"
    pod 'React-Core', :path => "#{prefix}/"
    pod 'React-CoreModules', :path => "#{prefix}/React/CoreModules"
    pod 'React-RCTActionSheet', :path => "#{prefix}/Libraries/ActionSheetIOS"
    pod 'React-RCTAnimation', :path => "#{prefix}/Libraries/NativeAnimation"
    pod 'React-RCTBlob', :path => "#{prefix}/Libraries/Blob"
    pod 'React-RCTImage', :path => "#{prefix}/Libraries/Image"
    pod 'React-RCTLinking', :path => "#{prefix}/Libraries/LinkingIOS"
    pod 'React-RCTNetwork', :path => "#{prefix}/Libraries/Network"
    pod 'React-RCTSettings', :path => "#{prefix}/Libraries/Settings"
    pod 'React-RCTText', :path => "#{prefix}/Libraries/Text"
    pod 'React-RCTVibration', :path => "#{prefix}/Libraries/Vibration"
    pod 'React-Core/RCTWebSocket', :path => "#{prefix}/"

    pod 'React-cxxreact', :path => "#{prefix}/ReactCommon/cxxreact"
    pod 'React-jsi', :path => "#{prefix}/ReactCommon/jsi"
    pod 'React-jsiexecutor', :path => "#{prefix}/ReactCommon/jsiexecutor"
    pod 'React-jsinspector', :path => "#{prefix}/ReactCommon/jsinspector"
    pod 'React-callinvoker', :path => "#{prefix}/ReactCommon/callinvoker"
    pod 'ReactCommon/turbomodule/core', :path => "#{prefix}/ReactCommon"
    pod 'Yoga', :path => "#{prefix}/ReactCommon/yoga", :modular_headers => true

    pod 'DoubleConversion', :podspec => "#{prefix}/third-party-podspecs/DoubleConversion.podspec"
    pod 'glog', :podspec => "#{prefix}/third-party-podspecs/glog.podspec"
    pod 'Folly', :podspec => "#{prefix}/third-party-podspecs/Folly.podspec"

    # The prefix to the 3rd party lib
    third_party_prefix = "./react-native-modules"

    pod 'react-native-safe-area-context', :path => "#{third_party_prefix}/react-native-safe-area-context"
    pod 'react-native-dt-sdk', :path => "#{third_party_prefix}/@dropthought/react-native-dt-sdk"
    pod 'RNCAsyncStorage', :path => "#{third_party_prefix}/@react-native-community/async-storage"
    pod 'react-native-aes', :path => "#{third_party_prefix}/react-native-aes-crypto"
    pod 'RNSecureKeyStore', :path => "#{third_party_prefix}/react-native-secure-key-store/ios"
    pod 'lottie-react-native', :path =>  "#{third_party_prefix}/lottie-react-native"
    pod 'lottie-ios', :path =>  "#{third_party_prefix}/lottie-ios"

end