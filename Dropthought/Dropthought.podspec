Pod::Spec.new do |s|

s.platform = :ios
s.ios.deployment_target = '12.0'
s.name = "Dropthought"
s.summary = "Dropthought iOS SDK."
s.requires_arc = true
s.static_framework = true
s.version = "1.0.0"
s.author = { "BCT-Barney" => "barney.chen@bahwancybertek.com" }
s.homepage = "https://github.com/DropthoughtSDK/dropthought-ios-sdk"
s.source = { :git => "../Dropthought/" }

s.source_files = ['src/*.{m,h}']
s.resource_bundles = {
    'main' => ['assets/*']
}

s.ios.framework  = 'UIKit'
s.dependency "React"

end
