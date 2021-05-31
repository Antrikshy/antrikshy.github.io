---
layout: post
title: "Launching Apps On My Desktop PC Using Alexa"
permalink: "/code/remotely-launching-apps-games-on-windows-10-desktop-pc-using-alexa"
description: "How I use Alexa to remotely open apps and games on my Windows 10 PC using voice commands."
---

For the last couple of years, I've had a *very* nifty setup in my home. It allows me to turn on my desktop PC using Alexa, so that I don't have to walk up to it, press the power button, then wait for it to boot up. I have [previously chronicled](/code/powering-on-my-desktop-pc-using-alexa-and-a-raspberry-pi) the process of setting it up on this blog.

An important bit of tl;dr, I achieved this using Simple Queue Service (SQS) on AWS, a Raspberry Pi constantly querying a queue for instructions, and the [Wake-on-LAN standard](https://en.wikipedia.org/wiki/Wake-on-LAN).

Ever since I set that up, I've had this idea of taking that a step further, and sending requests directly into Windows once it has woken up.

<!--more-->

## The Flow

The idea was to update my [Assisted Living](https://github.com/Antrikshy/Assisted-Living) project to evolve beyond just sending wake-up signals from Linux to a Windows PC, and start doing work directly inside Windows.

Sending a command from the cloud to a PC in its powered-off state has quite a few moving parts. Performing actions on a powered-on PC from the cloud is a lot easier. 

![](/assets/alexa-windows-control-architecture.png)

For those wondering, I use an asynchronous message queue because addressing a PC on a home Internet connection from the Internet is quite a hassle. More on that [here](/code/make-raspberry-pi-accessible-over-web-arch-linux).

Since I already had a message queue set up to go from Alexa to a Raspberry Pi, I decided I wanted to reuse it.

I wrote the original code with some extensibility in mind. I figured that one day, I could be sending other types of instructions to do fun things around the house. However, my message format didn't account for destination clients being addressable for some reason (it feels so obvious now).

Before any updates, the JSON message sent through the queue for my Raspberry Pi to pick up looked like this.

```
{
    intent: "SmartHomeAction",
    action: "TurnOn",
    entity: "Battlestation"
}
```

As part of this change, the idea was to extend the message to have what would essentially be a "to" field in each message. This would allow me to have multiple destinations querying the queue, and ignoring messages that are not addressed to them.

This ended up looking like the following.

```
{
    intent: "WindowsAction",
    target: "Battlestation",
    action: "OpenApplication",
    entity: entity
}
```

While not necessary, just to keep things clean, I updated the old message format to match the new structure.

```
{
    intent: "SmartHomeAction",
    target: "RaspberryPi",
    action: "TurnOn",
    entity: "Battlestation"
}
```

For now, I'd have two clients:

- the Raspberry Pi, to continue allowing me to power the PC on
- the Windows 10 installation on the PC, to perform actions like opening applications

With that solved, as long as client devices only pick up messages intended for them, I could include whatever other attributes that the destination client can make use of. For instance, for the desktop PC, I can send messages telling it to open games I frequently play.

I could make the message format a bit more "formalized" in the future. But I'm the only developer dealing with it for the moment, so I can afford to be scrappy and informal when it comes to parsing it.

## Finding The Right Runtime

With a few years of experience as a developer, one thing I have learned to do is thinking ahead to how my code *will run*, while making design decisions and tech choices. Especially with projects like this one, the realities of the platform significantly affect how I end up coding it.

So far, I had a few pieces already in place:

1. Alexa Skill
2. Message queue
3. A message listener process running on a Linux system

I needed a fourth piece - a message listener process that can run on a Windows system, and perform actions on that same machine.

### What Didn't Work

I started this project by overthinking it.

In addition to fulfilling the main purpose of this project, I had one key requirement for this utility - that it would run *completely* in the background. I didn't want a command line interface popping up at boot, no GUI that I would have to keep running, no permanently-minimized Taskbar item. An icon in the Notification Center was acceptable to me, if needed.

I looked for all kinds of solutions for writing a daemon that would run quietly in the background on Windows, read messages off SQS, and execute commands. I came across a couple of options that weren't necessarily the wrong choices, just choices that turned out to be more complex than I liked.

One of the trees I barked up was the [Windows Service Applications](https://docs.microsoft.com/en-us/dotnet/framework/windows-services/introduction-to-windows-service-applications) spec. As Microsoft describes it,

> Microsoft Windows services, formerly known as NT services, enable you to create long-running executable applications that run in their own Windows sessions. These services can be automatically started when the computer boots, can be paused and restarted, and do not show any user interface.

This sounded perfect for this project!

However, when I started tinkering with Visual Studio and the Service Applications API, it turned out to be pretty complicated. Furthermore, the project structure itself was opinionated, which made it unwieldy for a small project like this. This ws especially annoying as I intended to commit the project files into a not-super-standard GitHub repo that loosely holds cross-platform code (AWS Lambda, the aforementined Raspberry Pi, and now Windows 10).

### pythonw.exe

As I started to move away from the idea of writing a Windows Service, I also looked into the Windows built-in app, [Task Scheduler](https://docs.microsoft.com/en-us/windows/win32/taskschd/task-scheduler-start-page). It seems that Task Scheduler has the ability to run things in the background at startup.

However, I didn't end up going this direction, because I found something better.

Turns out Python for Windows ships with an executable called pythonw.exe, which can run any Python module silently in the background. Moreover, you can simply rename any Python file to have a .pyw extension, and associate them to run in pythonw.exe by default.

See more about pythonw.exe [in PEP 397](https://www.python.org/dev/peps/pep-0397/) and on [this Stack Overflow answer](https://stackoverflow.com/a/30313091/2005759).

*This* was exactly what I needed. I love Python, and had already been using it for the existing components of this system. It would also allow me to write a daemon (read: `while True`) that opens and runs continuously, completely in the background. No command line window, Taskbar item, or Notification Center icon whatsoever.

To set this background process to open at startup, I renamed the "driver" to carry a .pyw extension, created a shortcut to it, and placed it in the [Startup folder](https://support.microsoft.com/en-us/windows/add-an-app-to-run-automatically-at-startup-in-windows-10-150da165-dcd9-7230-517b-cf3c295d89dd).

## Code Walkthrough

Moving on from the runtime nitty-gritties, let's take a stroll through the code I used to achieve all this. Some of this will be redundant with the [previous post](/code/powering-on-my-desktop-pc-using-alexa-and-a-raspberry-pi) in this, uh... series, but things have changed significantly since then.

Again, the whole codebase, with no warranty, and instructions to replicate that may or may not be clear, [is on GitHub](https://github.com/Antrikshy/Assisted-Living).

Now, let's look at each of the two pieces involved in getting my mouth noises to open apps on my Windows PC.

### Alexa Skill

The Alexa Skill lies in my Amazon account and is configured with a handful of intents. Most importantly, there is at least one intent per Windows app that I want to be able to open from this system. 

You can see these intents being captured in the Lambda function that backs this Skill - [Assisted-Living/utility\_alexa_skill/main.py](https://github.com/Antrikshy/Assisted-Living/blob/master/utility_alexa_skill/main.py)

What follow are modified excerpts from my code as it looked at the time of publishing.

Let's start by setting up some common stuff, like functions to generate

1. what the Alexa framework needs in return for each intent being handled, and
2. SQS messages intended for my own message processor

{% highlight python %}
from enum import Enum, auto
import json
import os

import boto3

class SqsMessageTypes(Enum):
    TURN_ON_BATTLESTATION = auto()  # For existing functionality
    OPEN_APPLICATION_ON_BATTLESTATION = auto()
    # Other message types...

def generate_alexa_response(output_speech):
    return {
        'version': '1.0',
        'response': {
            'outputSpeech': {
                'type': 'SSML',
                'ssml': output_speech
            }
        }
    }

def generate_sqs_message(sqs_message_type, entity=None):
    # For existing functionality
    if sqs_message_type is SqsMessageTypes.TURN_ON_BATTLESTATION:
        message = {
            'intent': 'SmartHomeAction',
            'target': 'RaspberryPi',
            'action': 'TurnOn',
            'entity': 'Battlestation'
        }
        return json.dumps(message)
    # For new functionality
    if sqs_message_type is SqsMessageTypes.OPEN_APPLICATION_ON_BATTLESTATION:
        if entity is None:
            raise RuntimeError()
        message = {
            'intent': 'WindowsAction',
            'target': 'Battlestation',
            'action': 'OpenApplication',
            'entity': entity
        }
        return json.dumps(message)
    # Message generation for ther intents goes here...
{% endhighlight %}

Then we handle messages from the Alexa system itself. Intents are supplied as `event['request']['intent']['name']`, where `event` is the first argument to the Lambda function's handler.

Here's a basic example that

1. is run when Alexa receives an instruction,
2. writes a message to the SQS queue instructing my PC to open the game *Beat Saber*, and
3. tells Alexa to respond with an excited "Opening Beat Saber!" in response.

{% highlight python %}
def handle_request(event, context):
    sqs = boto3.resource('sqs')
    utility_q = sqs.get_queue_by_name(QueueName=os.environ['UTILITY_Q_NAME'])
    if event['request']['intent']['name'] == 'OpenBeatSaberOnBattlestation':
        message = generate_sqs_message(SqsMessageTypes.OPEN_APPLICATION_ON_BATTLESTATION, BattlestationApplications.BEAT_SABER.value)
        utility_q.send_message(MessageBody=message)
        return generate_alexa_response('<speak><amazon:emotion name="excited" intensity="medium">Opening Beat Saber</amazon:emotion></speak>')
    # Handle other intents...
{% endhighlight %}

If the PC isn't already on, this will cause the message to get queued up until it's received by the Windows background process the *next* time it gets powered on. This isn't ideal for a couple of reasons, one of them being that this would require me to speak out two requests if the PC is off (turn on PC, open application-of-choice).

Since I already have the abilty to remotely turn on the PC in question, why not do just that? If the PC is already on, redundant Wake-on-LAN requests are inert (they don't turn the PC *off*, phew!), so that message will just get eaten up by the Raspberry Pi and do nothing in that case.

Let's modify the intent handler slightly.

{% highlight python %}
def handle_request(event, context):
    sqs = boto3.resource('sqs')
    utility_q = sqs.get_queue_by_name(QueueName=os.environ['UTILITY_Q_NAME'])
    if event['request']['intent']['name'] == 'OpenBeatSaberOnBattlestation':
        # These two lines right here
        message = generate_sqs_message(SqsMessageTypes.TURN_ON_BATTLESTATION)
        utility_q.send_message(MessageBody=message)
        message = generate_sqs_message(SqsMessageTypes.OPEN_APPLICATION_ON_BATTLESTATION, BattlestationApplications.BEAT_SABER.value)
        utility_q.send_message(MessageBody=message)
        return generate_alexa_response('<speak><amazon:emotion name="excited" intensity="medium">Opening Beat Saber</amazon:emotion></speak>')
    # Handle other intents...
{% endhighlight %}

Problem solved!

Assuming things are functional on the Raspberry Pi *and* PC (see next section), this gives me the ability to say "Alexa, tell Home to open Beat Saber" and have all these things happen:

1. PC turns on
2. Background process attempts to open Beat Saber
3. Beat Saber attempts to open SteamVR
4. SteamVR opens Steam
5. SteamVR opens
6. Valve Base Stations spin up
7. Valve Index powers on (sadly, not the controllers)
8. Beat Saber opens in the meantime

The whole thing is quite magical, really.

### Message Receiver

Now let's peek into the code that runs on Windows, running using pythonw.exe, as described in earlier sections - [Assisted-Living/windows\_utility/sqs_receiver.py](https://github.com/Antrikshy/Assisted-Living/blob/master/windows_utility/sqs_receiver.py)

First, setting up some of the basics.

{% highlight python %}
import os
import json
import subprocess

import boto3

sqs = boto3.client('sqs')
utility_q_url = os.environ['UTILITY_Q_URL']
{% endhighlight %}

Then, I set up a class that expects to be run in a Python thread by a higher level runner script (more on this later), using a simple `.run()` call.

{% highlight python %}
class SQSReceiver:
    def run(self):
        while True:
            # Logic to constantly read the SQS queue goes here...
{% endhighlight %}

What follows is my code structure to read off the SQS queue, ignore messages not intended for this system, process the rest, then delete processed messages from the queue.

This utility uses [SQS long polling](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html) to reduce the number of requests made to SQS. [Here are docs](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/sqs-example-long-polling.html#enable-long-polling-on-message-receipt) for long polling queues with the Boto3 Python library.

{% highlight python %}
# ... continued from previous snippet
while True:
    response = sqs.receive_message(
        QueueUrl=utility_q_url,
        MaxNumberOfMessages=10,
        MessageAttributeNames=[
            'All'
        ],
        WaitTimeSeconds=5
    )
    messages_to_delete = []
    if 'Messages' in response:
        for message in response['Messages']:
            body = json.loads(message['Body'])
            if body['target'] != 'Battlestation':
                # Ignore message without deleting it
                continue
            # Do things with the message here...
            messages_to_delete.append({'Id': message['MessageId'], 'ReceiptHandle': message['ReceiptHandle']})
    if messages_to_delete:
        sqs.delete_message_batch(
            QueueUrl=utility_q_url,
            Entries=messages_to_delete
        )
{% endhighlight %}

Messages that are received from the queue are marked as "in-flight" by SQS. When a client (like this system) processes a message, it is expected to explicitly delete it from the queue. If it does not do so in a few seconds, the message returns to the queue (out of in-flight status) and can be received by polling clients once again.

Now we get to the meat of this system, which replaces the `# Do things with the message here...` comment in the snippet above.

{% highlight python %}
# ... continued from previous snippet
if body['intent'] == 'WindowsAction':
    if body['action'] == 'OpenApplication':
        if body['entity'] == 'Beat Saber':
            subprocess.Popen(r'\path\to\steamapps\common\Beat Saber\Beat Saber.exe')
        # Handle intents to open other applications here...
# return to previous snippet...
{% endhighlight %}

As you can see, this sytem uses Python built-ins to open requested apps as subprocesses. I was initially worried that they would somehow open in the context of the Python process, possibly causing issues or resulting in lowered performance. However, this doesn't seem to be the case, at least on Windows. Task Manager shows these apps as running as their own separate entities.

Nevertheless, I'm not brave enough to open games that employ anti-cheat systems, just in case they flag me as false positives just because I launch the applications in an unorthodox way. Anti-cheat systems are *incredibly* sophisticated software, and I just don't know enough about them (which is at least partly by design!) to confidently open Overwatch using a Python daemon.

Anyway, *that* is how I launch apps on my desktop PC using Alexa.

## The Smaller Details

That's been my project's high level overview. I'd like to discuss a couple of smaller details in addition to that. You know, some optional reading (honestly, I'm surprised you're still reading).

### Preventing Cross-Contamination

Since I reuse a queue, either of my two clients can pick up any of the messages, depending on who gets to it first. It's necessary to ensure that that the right system processes the right messages, as processing also involves deleting the messages. So, every message I send through my queue includes a `target` field. I check this in conditionals in each client to ensure they process and delete only the messages addressed to them.

It's still possible for a client to pick up a message and ignore it. This can introduce some latency to the system, as that message will remain in-flight in SQS. Conveniently, SQS comes with a [visibility timeout](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html) feature for adjusting the amount of time a message receives inaccessible to other clients.

An alternate solution would be to set up separate queues for each target client, which is fair. Designing this system as a set-and-forget deal is important to me, meaning I want to easily get back into it months down the line for maintenance or upgrades. Reusing a queue just fits my mental model better, and makes for fewer AWS resources to remember and manage.

### Shut Down & Restart

Since my Windows message processor is a Python daemon, obviously it can do more or less anything that can be acheived in a Python script. I figured issuing shut down and reboot commmands using my voice could occasionally come in handy.

I can just slot in these intent handlers into the Windows message fetcher.

{% highlight python %}
if body['action'] == 'ShutDown':
    os.system(r'shutdown /p')
if body['action'] == 'Restart':
    os.system(r'shutdown /r /t 5')
{% endhighlight %}

I was surprised the daemon didn't have to be run with admin privileges to run that. It just works!

### Cost

As I discussed in the [last episode](/code/powering-on-my-desktop-pc-using-alexa-and-a-raspberry-pi), SQS and Lambda are extremely inexpensive at personal-use scale. The cost of running this sytem should be $0.

### The Repo

**Find the GitHub repo here: [Antrikshy/Assisted-Living](https://github.com/Antrikshy/Assisted-Living)**

While this post will more or less be frozen in time, note that this is a living repo and may have grown by the time you see it.
