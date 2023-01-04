def use_dropthought_sdk
    
    pod 'Dropthought', :path => './Dropthought'
  
    prefix = "./react-native-modules"
      
    pod 'FBLazyVector', :path => "#{prefix}/react-native/Libraries/FBLazyVector"
    pod 'FBReactNativeSpec', :path => "#{prefix}/react-native/Libraries/FBReactNativeSpec"
    pod 'RCTRequired', :path => "#{prefix}/react-native/Libraries/RCTRequired"
    pod 'RCTTypeSafety', :path => "#{prefix}/react-native/Libraries/TypeSafety"
    pod 'React', :path => "#{prefix}/react-native/"
    pod 'React-Core', :path => "#{prefix}/react-native/"
    pod 'React-CoreModules', :path => "#{prefix}/react-native/React/CoreModules"
    pod 'React-Core/DevSupport', :path => "#{prefix}/react-native/"
    pod 'React-RCTActionSheet', :path => "#{prefix}/react-native/Libraries/ActionSheetIOS"
    pod 'React-RCTAnimation', :path => "#{prefix}/react-native/Libraries/NativeAnimation"
    pod 'React-RCTBlob', :path => "#{prefix}/react-native/Libraries/Blob"
    pod 'React-RCTImage', :path => "#{prefix}/react-native/Libraries/Image"
    pod 'React-RCTLinking', :path => "#{prefix}/react-native/Libraries/LinkingIOS"
    pod 'React-RCTNetwork', :path => "#{prefix}/react-native/Libraries/Network"
    pod 'React-RCTSettings', :path => "#{prefix}/react-native/Libraries/Settings"
    pod 'React-RCTText', :path => "#{prefix}/react-native/Libraries/Text"
    pod 'React-RCTVibration', :path => "#{prefix}/react-native/Libraries/Vibration"
    pod 'React-Core/RCTWebSocket', :path => "#{prefix}/react-native/"
    pod 'React-cxxreact', :path => "#{prefix}/react-native/ReactCommon/cxxreact"
    pod 'React-jsi', :path => "#{prefix}/react-native/ReactCommon/jsi"
    pod 'React-jsiexecutor', :path => "#{prefix}/react-native/ReactCommon/jsiexecutor"
    pod 'React-jsinspector', :path => "#{prefix}/react-native/ReactCommon/jsinspector"
    pod 'ReactCommon/callinvoker', :path => "#{prefix}/react-native/ReactCommon"
    pod 'ReactCommon/turbomodule/core', :path => "#{prefix}/react-native/ReactCommon"
    pod 'Yoga', :path => "#{prefix}/react-native/ReactCommon/yoga", :modular_headers => true
    pod 'DoubleConversion', :podspec => "#{prefix}/react-native/third-party-podspecs/DoubleConversion.podspec"
    pod 'glog', :podspec => "#{prefix}/react-native/third-party-podspecs/glog.podspec"
    pod 'Folly', :podspec => "#{prefix}/react-native/third-party-podspecs/Folly.podspec"
    pod 'react-native-safe-area-context', :path => "#{prefix}/react-native-safe-area-context"
    pod 'react-native-dt-sdk', :path => "#{prefix}/@dropthought/react-native-dt-sdk"
    pod 'RNCAsyncStorage', :path => "#{prefix}/@react-native-community/async-storage"
    pod 'react-native-aes', :path => "#{prefix}/react-native-aes-crypto"
    pod 'RNSecureKeyStore', :path => "#{prefix}/react-native-secure-key-store/ios"
    pod 'lottie-react-native', :path =>  "#{prefix}/lottie-react-native"

end


