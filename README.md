# RODES-Framework-Example

This Node.js script uses the OpenAI API and implements the RODES framework to convert a list of tasks into a weekly schedule. It leverages the 'gpt-3.5-turbo' model to automate task scheduling efficiently.

This code is part of an article published at www.twistedbrackets.com/riding-the-wave-of-effective-ai-prompt-crafting.

## Installation

1. **Install Node.js:** This script requires Node.js to run. If you don't have Node.js installed on your local system, download and install it from [here](https://nodejs.org/).

2. **Clone the Repository:** Clone the RODES-Framework-Example repository from GitHub to your local system using the following command in your terminal or command prompt:
    ```
    git clone https://github.com/levi-putna/RODES-Framework-Example.git
    ```
3. **Navigate to the Project Directory:** Use the command `cd RODES-Framework-Example` to navigate into the project directory.

4. **Install Dependencies:** Run `npm install` or `yarn install` in your terminal to install the required dependencies.

5. **OpenAI Account:** You need to have an OpenAI account to use their API. If you don't have an account, you can create one [here](https://beta.openai.com/signup/).

6. **Set OpenAI API Key:** Once you have an OpenAI account, retrieve your API key. Save this key in a `.env` file in your project's root directory like this:
    ```
    OPENAI_API_KEY=your_api_key
    ```
   Replace `your_api_key` with your actual OpenAI API key.

## Usage

1. Tasks should be passed as command line arguments when running the script. For best results the tasks should be comma-separated, and each task can optionally include a colon followed by a time allotment in minutes. If no time allotment is given, the task is assumed to take 30 minutes by default. 
    - Example: `node index.js "task1:60,task2:45,task3"`.
2. The script will output a proposed schedule for your tasks based on the AI's best judgement.
