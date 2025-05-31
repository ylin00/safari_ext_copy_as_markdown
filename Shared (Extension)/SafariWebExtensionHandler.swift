//
//  SafariWebExtensionHandler.swift
//  Shared (Extension)
//
//  Created by Ian Lin on 3/22/25.
//

import SafariServices
import os.log
import UserNotifications

class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {

    func beginRequest(with context: NSExtensionContext) {
        let request = context.inputItems.first as? NSExtensionItem

        let profile: UUID?
        if #available(macOS 14.0, *) {
            profile = request?.userInfo?[SFExtensionProfileKey] as? UUID
        } else {
            profile = request?.userInfo?["profile"] as? UUID
        }

        let message: [String: Any]?
        if #available(macOS 11.0, *) {
            message = request?.userInfo?[SFExtensionMessageKey] as? [String: Any]
        } else {
            message = request?.userInfo?["message"] as? [String: Any]
        }

        os_log(.default, "Received message from browser.runtime.sendNativeMessage: %@ (profile: %@)", String(describing: message), profile?.uuidString ?? "none")

        // Handle the message
        if let message = message {
            if let status = message["status"] as? String,
               let messageText = message["message"] as? String {
                showNotification(status: status, message: messageText)
            }
        }

        let response = NSExtensionItem()
        if #available(macOS 11.0, *) {
            response.userInfo = [ SFExtensionMessageKey: [ "echo": message ] ]
        } else {
            response.userInfo = [ "message": [ "echo": message ] ]
        }

        context.completeRequest(returningItems: [ response ], completionHandler: nil)
    }

    private func showNotification(status: String, message: String) {
        let content = UNMutableNotificationContent()
        content.title = "Copy as Markdown"
        content.body = message
        content.sound = .default

        let request = UNNotificationRequest(identifier: UUID().uuidString,
                                          content: content,
                                          trigger: nil)

        UNUserNotificationCenter.current().add(request) { error in
            if let error = error {
                os_log(.error, "Error showing notification: %@", error.localizedDescription)
            }
        }
    }
}
