
#import "RNWindowSize.h"
#import <Cocoa/Cocoa.h>


@implementation RNWindowSize
- (dispatch_queue_t)methodQueue{
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE()


RCT_EXPORT_METHOD(resize:(NSInteger)width height:(NSInteger)height ) {

  NSRect frame;
  frame.size.height = (CGFloat)height;
  frame.size.width = (CGFloat)width;
  dispatch_async(dispatch_get_main_queue(),
                 ^{

                   [[[[NSApplication sharedApplication] windows] objectAtIndex:0] setFrame:frame display:YES animate:NO];
                   [[[[NSApplication sharedApplication] windows] objectAtIndex:0] center ];

                 });
}

@end
