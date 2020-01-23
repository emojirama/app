# emojirama

To start the app, run the following:

```
quasar dev -m pwa -p 4000
```


```
docker exec -it backend bash -c 'cd notebooks && ../manage.py shell_plus --notebook'
```

Deployment to AWS using CloudFormation and GitLab

- [x] Register domain with AWS Route53
- [x] Add variables to GitLab CI
- [x] Create S3 bucket for emojirama CloudFormation templates
- [x] Create stack with only ACM resources and verify
- [x] Setup S3 bucket and CloudFront CDN in CloudFormation
- [x] Build ECR resources in CloudFormation
- [x] Bring up VPC and other stateless services
- [x] Create OAuth2 apps for Facebook, Google and GitHub
- [x] Add OAuth2 app secrets to `backend.yaml` secrets and to AWS parameter store
