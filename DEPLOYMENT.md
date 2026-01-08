# Tipwave Marketing Website - Deployment Setup

## GitHub Actions Workflow

The marketing website has a fully automated deployment pipeline that:
1. Builds the React + TailwindCSS site with Vite
2. Deploys to the `tipwave-marketing-site` S3 bucket
3. Invalidates the CloudFront distribution cache

### Workflow File
`.github/workflows/deploy.yml` - Triggers on every push to `main` branch.

## AWS Configuration

### Required Secrets in GitHub

Add these secrets to your GitHub repository settings (Settings → Secrets and variables → Actions):

| Secret Name | Value | Notes |
|---|---|---|
| `AWS_ACCESS_KEY_ID` | Your AWS Access Key | Same as frontend deployment |
| `AWS_SECRET_ACCESS_KEY` | Your AWS Secret Key | Same as frontend deployment |
| `AWS_REGION` | `us-east-1` | Same as frontend deployment |

### AWS Resources

- **S3 Bucket**: `tipwave-marketing-site`
- **CloudFront Distribution ID**: `E2XIM4NN5SEMR7`
- **Domain**: `www.tipply.live`
- **Bucket Region**: `us-east-1`

### S3 Bucket Configuration

Your S3 bucket should be configured as follows:

1. **Static Website Hosting**: Enable
   - Index document: `index.html`
   - Error document: `index.html` (for SPA routing)

2. **Permissions**: Block all public access (use CloudFront for access)

3. **Bucket Policy** (if using CloudFront):
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFront",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity YOUR_OAI_ID"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::tipwave-marketing-site/*"
    }
  ]
}
```

4. **CORS** (if needed for API calls):
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["https://tipwave.io"],
    "ExposeHeaders": ["x-amz-version-id"]
  }
]
```

### CloudFront Configuration

- **Distribution ID**: `E2XIM4NN5SEMR7`
- **Origin**: `tipwave-marketing-site.s3.us-east-1.amazonaws.com`
- **Viewer Protocol Policy**: Redirect HTTP to HTTPS
- **Compress Objects Automatically**: ✅ Enabled
- **Cache Behaviors**:
  - `.html` files: 0 second TTL (no-cache)
  - All other files: 3600 second TTL (1 hour cache)

## Deployment Process

### Automatic Deployment (Recommended)
1. Make changes to code in the `main` branch
2. Push to GitHub
3. GitHub Actions automatically:
   - Builds the site (`npm run build`)
   - Syncs to S3
   - Invalidates CloudFront cache
4. Changes live in ~2-5 minutes

### Manual Deployment
If you need to manually deploy without pushing:

```bash
# Build locally
npm run build

# Deploy to S3 (requires AWS credentials configured)
aws s3 sync dist/ s3://tipwave-marketing-site --delete

# Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id E2XIM4NN5SEMR7 \
  --paths "/*"
```

## Monitoring Deployments

1. **GitHub Actions**: View workflow status in the [Actions](https://github.com/igheddx/tipwave-marketing-website/actions) tab
2. **CloudFront**: Check invalidation status in AWS CloudFront console
3. **S3**: Verify objects uploaded in S3 console

## Cache Strategy

- **HTML files**: No caching (max-age=0, must-revalidate)
  - Ensures users always get latest version
  - Fallback to index.html for SPA routing
- **CSS/JS/Images**: 1 hour cache (max-age=3600)
  - Vite adds content hashes to filenames automatically
  - Safe to cache since filenames change with content

## Environment Variables

Build-time environment variables in `.github/workflows/deploy.yml`:

```yaml
VITE_API_URL: https://api.tipwave.io  # Update as needed
```

## Troubleshooting

### Deployment Fails
1. Check GitHub Actions logs for errors
2. Verify AWS credentials are correct and have S3 + CloudFront permissions
3. Ensure `npm run build` works locally

### Changes Not Live
1. Check CloudFront invalidation completed
2. Clear browser cache (Ctrl+Shift+Del or Cmd+Shift+Del)
3. Check S3 bucket for updated files
4. Wait up to 5 minutes for CloudFront edge servers to update

### Build Fails
1. Run `npm install` locally to ensure dependencies are installed
2. Check Node.js version: `node --version` (should be 20+)
3. Test build locally: `npm run build`

## Next Steps

1. **Add to GitHub**: Ensure AWS secrets are added to the repository
2. **Test Deployment**: Push a small change and verify it deploys
3. **Monitor**: Watch the Actions tab during deployment
4. **Verify**: Visit the live site and confirm changes are visible
5. **DNS**: Point your domain to the CloudFront distribution (if not already done)

## Resources

- [GitHub Actions AWS Credentials](https://github.com/aws-actions/configure-aws-credentials)
- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [CloudFront Distribution](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-overview.html)
- [Vite Build Configuration](https://vitejs.dev/guide/build.html)
