---
layout: post
title: "Streaming Direct PUT Firehose Records Into S3 With Newline Characters"
permalink: "/code/stream-direct-put-aws-kinesis-firehose-to-s3-python-boto-with-newline-characters"
description: "Here's how to insert newline characters when writing custom JSON data to S3 via a Kinesis Firehose stream, without a Lambda adapter, Glue tables, serialization/deserialization or Dynamic Partitioning."
---

Recently, I found myself working with AWS Kinesis Firehose and S3. All I wanted was to write *custom* JSON records programmatically into a Firehose stream, and have it output to an S3 location. However, by default, the records would get written without any newline separators. Searching for how to insert newline characters generally got me to complex solutions for complex data input sources.

Neither AWS documentation, nor existing Stack Overflow answers pointed me towards the incredibly simple actual syntax. I chased down complex solutions using Firehose features until I figured out you can just include the newline character directly after your message.

<!--more-->

Note that my solution is for:

- Python
- Boto3
- Direct PUT writes, aka programmatically writing custom records into the stream

It does not apply if your Firehose data source is another AWS service, such as an SQS queue or a DynamoDB stream.

In case you, like me, are looking into any of these *just* to insert newline characters...

- [Dynamic Partitioning](https://docs.aws.amazon.com/firehose/latest/dev/dynamic-partitioning.html)
- [Data Transformation](https://docs.aws.amazon.com/firehose/latest/dev/data-transformation.html) using Lambda
- [Record Format Conversion](https://docs.aws.amazon.com/firehose/latest/dev/dynamic-partitioning.html#dynamic-partitioning-new-line-delimiter)

... stop. They're not necessary if you're writing custom data straight into the stream using an AWS API or SDK.

This assumes that you have the infrastructure set up already. All you need is:

- An S3 bucket
- A simple Kinesis stream with `deliveryStreamType` set to `"DirectPut"` and an `extendedS3DestinationConfiguration` containing minimal configuration

Now for the code.

For some reason, I kept following suggestions to encode the data in different ways (base64 etc), until I figured out that the solution was actually very simple. It took me a bit of trial and error to structure it correctly.

{% highlight python %}

import boto3, json

# Your initialization may be different, depending on how you authenticate
firehose = boto3.client("firehose")

# Demo data - single dict or a list of dicts to be batch-written
single_datapoint: Dict = {"key": "value"}
batch_datapoints: List[Dict] = [
    {"key1": "value1"},
    {"key2": "value2"},
    {"key3": "value3"}
]

# Writing a single datapoint with newline appended
firehose.put_record(
    DeliveryStreamName="stream-name",  # Remember to change!
    Record={"Data": json.dumps(single_datapoint) + "\n"}
)

# Writing batch datapoints with newlines in between and appended at the end
firehose.put_record_batch(
    DeliveryStreamName="stream-name",  # Remember to change!
    Records=[
      {"Data": json.dumps(item) + "\n"}
      for item in batch_datapoints
    ]
)

{% endhighlight %}

It's so straightforward, it's silly. If you happen to be stuck like I was, these snippets are tried and tested. I hope they help!