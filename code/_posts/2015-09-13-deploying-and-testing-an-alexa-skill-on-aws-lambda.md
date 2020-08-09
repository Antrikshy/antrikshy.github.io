---
layout: post
title: "Deploying And Testing An Alexa Skill On AWS Lambda"
permalink: "/code/deploying-and-testing-alexa-skill-aws-lambda"
redirect_from: "/blog/deploying-and-testing-alexa-skill-aws-lambda"
description: "A tutorial on how to deploy and text JavaScript code powering an Amazon Alexa skill on the Amazon AWS Lambda service."
---

I find Amazon's [official documentation](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-lambda-function) on deploying Alexa Skills a bit hard to follow. After reading through it a few times and finally managing to get it working, I decided to re-word all of that information into this concise blog post that I hope is more digestible. I trust that someone will find it useful.

What I am trying to do here is to summarize the process that Amazon's documentaion lays out in a rather messy fashion. So this post *does* assume that you know what you are doing. It will (hopefully) get you started *testing* your Skill.

<!--more-->

>Note: Before you submit it for listing on the store or deploy it otherwise, it is your responsibility to ensure that everything is configured correctly.

My language preference for working with Alexa is JavaScript. Some things may or may not be the same if you are developing in Java.

## Setup

You need to configure two things:

1. Scaffolding for a Lambda function that will execute your code
2. An Alexa Skill on Amazon's Developer Console

Configuration of both these things kind of go hand-in-hand. 

Start by opening the [Developer Console](https://developer.amazon.com/home.html) and the [AWS Console](https://console.aws.amazon.com/console/home). Select Lambda (under Compute) on the AWS Console.

Create a developer account if you need to. This is the same account as the one used to publish on Amazon's Appstore, and you can log in using your regular Amazon account.

Follow [Amazon's documentation here](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-lambda-function#Creating%20a%20Lambda%20Function%20for%20an%20Alexa%20Skill) to create a new Lambda function. The only thing that needs to be swapped out is the example code, which you will do later.

Copy the ARN (Amazon Resource Name) of this Lambda function.

Switch focus to the Developer Console. Here, create a new Skill under Apps & Skills, Alexa.

Fill out the required info - name, description, an arbitrary version number. Then paste in the Lambda ARN in the appropriate field. This links your Skill to the Lambda function, where your code actually runs. 

Hit Next.

Fill out the interaction model on this page. If you have not designed this yet, you can fill it in later.

You will notice that you *don't actually need to put your intents and sample utterances anywhere in your code*. It only has to go into this page. You could come here every time you want to update anything in it. But I prefer to organize it just like the [sample Skills](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/using-the-alexa-skills-kit-samples) for tidiness.

Hit Next.

On this page, you can enable your Skill for testing. It will appear in the Alexa app (or on the [web interface](http://alexa.amazon.com)) as any other Skill, enabled on your Echo.

## Code Requirements

I have not developed a Skill using Java, so your mileage may vary here. I have, however, worked with Skills in JavaScript, based on Amazon's [sample Skills](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/using-the-alexa-skills-kit-samples). To push a JavaScript skill for testing on Lambda, you probably want to upload a minimum of two files. I urge you to take a look at the sample code to get an idea. I have yet to diverge from this suggested setup.

Each Skill in the sample code contains an `AlexaSkill.js` file that acts as a layer to communicate with the Alexa Skills Kit and an `index.js` file that contains the main logic. The latter contains a `handle` function that initializes and handles requests. If you change any of these, you will need to fiddle with the configuration that comes with the Alexa Lambda setup.

These are the two files that need to be uploaded to Lambda to make your Skill run.

Go to the Code tab in your Lambda function and upload these two files, zipped.

>Tip: If you want to include more code such as npm modules, simply include all of it in this .zip archive. It should work as long as you `require` everything correctly.

## Testing

To update your Lambda function code, zip and upload the latest copy of your code and continue testing. This is all that is required to update your Skill's code in the future. You should probably look into the [AWS CLI](https://aws.amazon.com/cli/) for the long run.

To test your Skill, you can use an Echo, as long as the connected Amazon account is the same as your developer account. Alternatively, you can use that chatbox like feature on the Test page of your Skill on the Developer Console. You can pretend you are talking to Alexa in text.

Any console output from your code automatically goes into CloudWatch, another AWS offering. Find it on the AWS Console and click Logs in the left pane.
