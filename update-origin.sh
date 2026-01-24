#!/bin/bash
set -e

export AWS_PROFILE=tipply-prod
DISTRIBUTION_ID="E1J1EDL894AO8K"
OAC_ID="oac-tipwave-marketing-site.s3.amazonaws.com-mk77wzihlid"
BUCKET_NAME="tipwave-marketing-site"

echo "Fetching current distribution config..."
aws cloudfront get-distribution-config --id $DISTRIBUTION_ID > dist-current.json

ETAG=$(jq -r '.ETag' dist-current.json)
echo "ETag: $ETAG"

echo "Creating updated config..."
jq --arg bucket "$BUCKET_NAME" \
   --arg oac "$OAC_ID" \
   '.DistributionConfig |
    .Origins.Items[0] = {
      "Id": ($bucket + "-origin"),
      "DomainName": ($bucket + ".s3.amazonaws.com"),
      "OriginPath": "",
      "CustomHeaders": {"Quantity": 0},
      "S3OriginConfig": {
        "OriginAccessIdentity": ""
      },
      "OriginAccessControlId": $oac
    } |
    .DefaultCacheBehavior.TargetOriginId = ($bucket + "-origin")
   ' dist-current.json > dist-update.json

echo "Applying update..."
aws cloudfront update-distribution \
    --id "$DISTRIBUTION_ID" \
    --distribution-config file://dist-update.json \
    --if-match "$ETAG"

echo "✓ Update submitted. CloudFront will deploy in 5-10 minutes."
