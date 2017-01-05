
#import "RNOpenApp.h"
#import <Cocoa/Cocoa.h>


@implementation RNOpenApp

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(openApp:(NSString *)appName) {

  if(![[NSWorkspace sharedWorkspace] launchApplication:appName])
    NSLog(@"%@ failed to launch", appName);
  
}
@end
