# Professional Portfolio
Welcome to the repository for my Professional Portfolio. This isn't just a resume — it's an interactive encapsulation of my tech journey. By browsing the source, you'll see not just where I've been, but how I approach problems and solutions.

![portfolio-screenshot.gif](images%2Fportfolio-screenshot.gif)
## Design & Components
### Philosophy
I decided to build this website, using a single page, smooth scroll approach. Focusing the User on the content, by keeping the navigation / interaction intuitive.

This also provides a natural flow, to keep the design simple, modern,and concise. 

### Responsive Design
As all modern tools, I designed the portfolio with support for mobile devices. This particular page is designed for a larger screen experience, however, mobile devices are fully supported.

## Tech Stack
### 1. Front End
The main structure is of course HTML5, with CSS3 for styling. However, I decided to use Tailwind CSS for styling and speed.

DOM manipulation, some effects, mobile menu, button and the smooth scroll are all handled by vanilla JavaScript.

### 2. Back End
In terms of the website, there is no operating back end. Any data that is displayed dynamically, is defined in JavaScript objects, and rendered to the DOM.

### 3. Deployment (IaC)
Although this is a static website, and this is probably overkill, I decided to package deployment in the following way:

#### a) AWS
- S3 Bucket to store the static website
- CloudFront to serve the website
- Route 53 to manage custom domains & DNS
- Certificate Manager to request & manage SSL certificates
- IAM to manage permissions

#### b) Terraform
Terraform to define, create and manage the AWS infrastructure previously described.

Terraform cloud to manage the state of the infrastructure, and to trigger deployments. Both of these tools form a powerful resource, to manage infrastructure as code, in a standardized, repeatable, and versioned way. Across cloud providers. 

#### c) Version control & CI/CD
Of course used Git to manage version control. GitHub to host the repository, and GitHub Actions to manage CI/CD.

Since my terraform state is managed by terraform cloud, each time i push to the master branch, a GitHub action is triggered, which in turn triggers a terraform cloud run, which deploys the infrastructure to AWS.

## Contributions & Feedback
While this is my personal showcase, I appreciate all feedback. It helps me grow and refine my approach to tech and design. If you've got thoughts or if something caught your eye, let's connect!

## Contact
Portfolio: [https://www.jaimegonzalez.tech](https://www.jaimegonzalez.tech)

LinkedIn: [https://www.linkedin.com/in/gonzalezjaime](https://www.linkedin.com/in/gonzalezjaime)

Email: [jaime@graybearddev.com](mailto://jaime@graybearddev.com)