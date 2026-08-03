Welcome to NameVetter - AWS version! 🎉

Due to my Microsoft Azure student account expiring the services after graduating,
I decided to familiarize myself with AWS more.

NameVetter - AWS is a full-stack, serverless web application designed to perform deep linguistic and cultural safety checks on names, words, and phrases across multiple global languages. By leveraging generative AI, NameVetter analyzes direct translations, phonetics, and cultural nuances to categorize terms as Safe to Use, Use with Caution, or Avoid, helping users make informed, culturally sensitive decisions.

Developed by Hae In Lee, this project utilizes a modern serverless architecture on AWS for maximum scalability and lightning-fast performance.

✨ Features
🧠 AI-Powered Cultural Vetting: Utilizes Amazon Bedrock's Nova Micro model to provide highly accurate, culturally aware nuances and safety categorizations.

⚡ Serverless Architecture: Built entirely on AWS Lambda and API Gateway, ensuring rapid response times and zero server maintenance.

🎨 Dynamic Theming & Accessibility: Features a fully responsive UI with built-in Light/Dark mode toggles and dynamic font scaling (Small, Medium, Large) driven by CSS variables.

🌐 Multi-Language Support: Maps and translates between multiple languages including English, Korean, Spanish, French, German, Mandarin, Hindi, Arabic, Japanese, and Russian.

🔒 Robust Error Handling: Includes strict prompt engineering (separating system instructions from user data) to completely eliminate AI hallucinations and ensure reliable JSON payloads.

🛠️ Tech Stack
Frontend:

React.js

CSS3 (Custom Variables for dynamic theming & scaling)

Hosted via Amazon S3 & Amazon CloudFront

Backend:

Node.js

AWS Lambda

Amazon API Gateway (with fully configured CORS)

Amazon Bedrock (amazon.nova-micro-v1:0 model) via the AWS SDK (@aws-sdk/client-bedrock-runtime)

🚀 Getting Started
Prerequisites
Node.js installed locally

An AWS Account with Bedrock model access (Nova Micro) enabled

AWS CLI configured with appropriate IAM permissions

Installation & Setup
1. Clone the repository:

Bash
git clone https://github.com/yourusername/NameVetter.git
cd NameVetter
2. Install Frontend Dependencies:

Bash
npm install
3. Start the Development Server:

Bash
npm run dev
4. Backend Deployment (AWS):

Create an AWS Lambda function running Node.js.

Attach an IAM role with bedrock:InvokeModel permissions.

Deploy the provided handler.js code to your Lambda function.

Set up an HTTP/REST API in AWS API Gateway, link it to your Lambda, and enable CORS.

Update the API_GATEWAY_URL in your frontend NameVetterFrontend.jsx file to point to your new endpoint.

💡 How It Works
The user inputs a word, selects the origin language, and selects the target language in the React frontend.

The frontend ensures a clean state and sends a stringified JSON payload via fetch to the AWS API Gateway.

API Gateway triggers the Node.js AWS Lambda function.

The Lambda function parses the input, maps the language codes to full string names, and constructs an isolated User Prompt and a strict System Prompt.

Amazon Bedrock processes the prompts and returns a highly formatted JSON response detailing the translation, phonetics, and cultural nuance.

The Lambda function parses the AI's response and sends a clean JSON payload back to the frontend.

The React UI updates instantly to display the safety rating and cultural context!

📝 License
This project is open-source and available under the MIT License.