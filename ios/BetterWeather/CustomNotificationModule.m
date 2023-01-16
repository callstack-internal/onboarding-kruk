#import <UIKit/UIKit.h>
#import <UserNotifications/UserNotifications.h>
#import "CustomNotificationModule.h"

@implementation PushNotificationTrigger

// This makes our module be accessible from JS. You can provide string argument, which will be the name accessible from JS.
// Otherwise the class name will be used (here: MyNotification)
RCT_EXPORT_MODULE()


// This is how we're exporting methods to JS.
// First argument is the name of a function, the rest are arguments
RCT_EXPORT_METHOD(showNotification:(NSString *)title location:(NSString *)body)
{
    UNMutableNotificationContent *content = [[UNMutableNotificationContent alloc] init];
    content.title = title;
    content.body = body;
    content.sound = UNNotificationSound.defaultSound;

    UNTimeIntervalNotificationTrigger *trigger = [UNTimeIntervalNotificationTrigger
                                                  triggerWithTimeInterval:0.1f
                                                  repeats:NO];

    UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:@"requestName"
                                                                          content:content
                                                                          trigger:trigger];


    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    dispatch_async(dispatch_get_main_queue(), ^{

      [center addNotificationRequest:request withCompletionHandler:nil];

    });
}

@end
