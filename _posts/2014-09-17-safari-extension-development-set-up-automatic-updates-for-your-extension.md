---
layout: post
title: "Safari Extension Development: Set-Up Automatic Updates For Your Extension"
permalink: "safari-extension-development-automatic-updates"
excerpt_separator: <!--more-->
---

If you are developing a Safari browser extension, you don't just want to release it. Later down the road, you may want to extend it further or just squash some bugs. You cannot expect your users to return to your website or the extension gallery to download updates manually.

Unfortunately, Safari extensions are an often ignored part of Apple's Developer Program and the company does not maintain a formalized update system like its App Stores. Even if you submit your extension to Apple's gallery, you will need to set up your own server to provide a download link and manage your own update mechanism. They do not provide server space or an admin console to push updates.

Apple's desktop browser does have built-in support for auto-updates, so you are not left in the cold completely. It is, however, a bit of a hassle to set up and can be very confusing and frustrating when you are ready to publish an extension for the very first time.

<!--more-->

## Enter Amazon S3

In this guide, I will show you how to set up an auto-update system for your extension without your own server. We shall use Amazon S3, the simple hosting platform of my choice.

>Note: GitHub cannot be used to deploy updates to Safari extensions (comment if I'm wrong). Even if you use raw file links, the MIME type is not set correctly and Safari fails to detect new versions.

If you are not familiar with Amazon Web Services, you will be pleased to know that it has a free tier. If you don't have a lot of users, the server space won't cost you anything. Their prices scale with increasing traffic, so it shouldn't cost you too much. My Safari extensions have a few hundred to a thousand users in total. S3 costs me around 50 US cents a month.

**Create an account** and **set up an S3 bucket**. It is very straightforward. Their [official documentation](http://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) is quite nice. A bucket is just some server space on S3.

I have a bucket called *antrikshyprojects* that holds all the downloads for my projects. You may want to **use folders right from the beginning**, because it may be hard to move your update files after you release your extension. Doing so may break your users' auto-updates. You can also choose to create a bucket just for your extensions.

## The Update Process

Assume that your extension has one user. Its update system is made up of three components:

1. the installed copy of the extension in the user's browser
2. a copy of its latest version on the server
3. a .plist file on the server

A .plist (property list) file is just an XML file used to store preferences on Apple operating systems. Here is [some information](https://developer.apple.com/library/ios/documentation/Cocoa/Conceptual/PropertyLists/UnderstandXMLPlist/UnderstandXMLPlist.html) about them if you are curious. In our case, a .plist file will be used to store information about the current version of your extension. For our purposes, the file contains the following relevant bits of info:

* current version number
* link to download

This is how the process works:

1. User opens Safari.
2. Safari **checks the current version number** of the extension by querying the **.plist file** from server.
3. If this version matches the installed version, nothing happens.
4. If the **version number is higher** than that of the installed copy, it **follows the download link** in the file and automatically updates the extension.

It's pretty straightforward, isn't it? Yet, I have been really frustrated while setting it up more than once. That's why I'm documenting it to help others. Next, I shall walk you through my testing and deployment process so you can avoid the common pitfalls.

>Note: Because your users' browsers will check for updates by downloading the (very tiny) .plist file every time they start up, your server will constantly receive traffic. Keep this in mind, because you may get charged for S3 even if you don't push updates constantly. Usually, the amount is negligible.

## Deployment

The following process assumes that you have already signed a free Safari developer certificate from Apple.

1. Build a package for your extension in Extension Builder and upload it to a nice, permanent location in your S3 bucket. Copy the URL to this file from the S3 console. Remember to make the file public during the upload.
2. Get the [.plist file template](https://developer.apple.com/library/safari/documentation/tools/conceptual/safariextensionguide/UpdatingExtensions/UpdatingExtensions.html) from Apple. Create a new file and paste the template in it. You can name it anything. I always name it *ExtensionName*Update.plist. Don't save it inside the extension folder. I normally save it a level above, still inside my Git repo.
3. As per the instructions, leave everything that is *not* inside a `<string>` tag as it is. Every one is preceded by something in a `<key>` tag. It's just a normal key-value pair notation.
4. Change the `<string>` for `CFBundleIdentifier`. As an individual developing extensions, I have always used `com.Antrikshy.safari.ExtensionName` myself. Also add your certificate ID.
5. Add your version number to both version fields, `CFBundleVersion` and `CFBundleShortVersionString`. Here's a [quick explanation](http://stackoverflow.com/a/19728342/2005759) on the subtle difference.
6. Paste the URL to your extension that you copied from from S3 under the `URL` key.
7. Upload this .plist file to S3 and copy its URL. Remember to keep it public.
8. Paste this URL into the Update Manifest field for your extension in Extension Builder.

>Note: Make *absolutely* sure that the version number that you put into the .plist file matches the version number of your choice in Extension Builder. Also make sure that your bundle identifier matches as well. This is a mistake I have made twice and wasted time getting frustrated over why my extension wouldn't update when testing.

With this, you are ready to release your extension. Just provide the S3 download link for use on Apple's gallery or wherever else you wish to advertise it. Again, do not change the URL to your .plist file or your extension's download. Both are important parts of the automatic check-and-update process. When you wish to release an update, increment the version number of your extension in Extension Builder, build a package, edit the .plist file with the new numbers and upload both to the server, replacing previous versions.

However, it is a solid idea to take the update functionality on a spin before you release. The smallest mistake can render the functionality useless and then you will be forced to get your users to manually update. It is not fun. I speak [from experience](http://redd.it/2dyyo3).

## Testing Guide

Whenever I start testing my update functionality, things get very messy. It is a good idea to **make a copy of your entire extension folder** and the .plist file somewhere else as backup. If you are using Git, just make a copy of the entire repo somewhere else. We won't commit anything while testing, so it won't mess things up.

To test the update functionality, we shall fake an update on the server.

1. Turn off auto-updates for extensions in Safari (Preferences, Extensions). This will allow us to easily check if the update shows up.
2. Increment the version numbers (in both fields) for your extension in Extension Builder and build a package for your extension.
3. Upload this package to the server, replacing the real file. Do not change the name or location because this will change the URL.
4. Edit a copy of your .plist file with the new fake version numbers and upload this to the server. Again, replace the real file.
5. Make sure that a lower version number of the extension is already installed in your browser. Just decrement the version numbers in Extension Builder and reload the extension.
6. Restart the browser.

If everything was set up properly, an update should show up in Preferences, Extensions, Updates. If it does not show up, go back and check.

Once you are done testing, you can restore the folder you copied as backup before. Make any corrections in it. The version numbers don't need to be changed back in Extension Builder. Rebuild a package with the original version number, edit the .plist file and upload both back to the server.

You are now ready to launch.
