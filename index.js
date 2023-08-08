require('dotenv').config(); // Load environment variables
const { Configuration, OpenAIApi } = require("openai");

// Using RODES framework (Role, Objective, Details, Examples, Sense Check)

// ROLE (R): Assigning a role to the AI for the task.
const role = "You are my personal assistant skilled in organising schedules, setting reminders, and managing time effectively.";

// OBJECTIVE (O): Establishing the main plot, what the AI needs to achieve.
const objective = "Your objective is to organise these tasks into a weekly schedule including Monday, Tuesday, Wednesday, Thursday and Friday ensuring no conflicts and ample rest time is included.";

// DETAILS (D): Laying out ground rules for the task.
const details = "The schedule should not have any overlapping appointments, must include a one-hour lunch break each day, should not allow for a work day greater than 9 hours and should also incorporate two 15-minute rest periods. Try to spread tasks evenly across the week to ensure a balanced schedule. Do not include any tasks that are not listed in the task list.";

// EXAMPLES (E): Providing examples to guide the AI in what is needed.
const examples = `Example schedule:
- Monday: 
    8-9am: Breakfast & personal time. 
    9-11am: Meeting with Marketing team. 
    11-11:15am: Break. 
    11:15am-1pm: Project work. 
    1-2pm: Lunch. 
    2-3:30pm: Emails and administrative tasks. 
    3:30-3:45pm: Break. 
    3:45-5pm: Meeting with Sales team. 
    5-6pm: Wrap-up and planning for the next day.
- Tuesday: 
    ... (similar structure).
- Wednesday: 
    ... (similar structure).
- Thursday: 
    ... (similar structure).
- Friday: 
    ... (similar structure).`;

// SENSE CHECK (S): Asking the AI if it fully comprehends its role, goals, and requirements.
const senseCheck = "If you do not understand your role as my personal assistant and the task of creating a well-structured schedule for my upcoming week? Respond requesting any additional information you need from me to complete this task more efficiently.";

// Accept the tasks as a command-line argument in the format "task:time"
const tasksArg = process.argv[2];
// If time allotment is not given, default to 30 min
let tasks = tasksArg.split(',').map(task => {
    let [taskName, time] = task.split(':');
    if (!time) {
        time = '30 min';
    }
    return `${taskName}(${time})`;
}).join(', ');

const tasksList = `Tasks: ${tasks}`;

(async () => {
    // Create OpenAI configuration
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Create OpenAI instance
    const openai = new OpenAIApi(configuration);

    console.log(`Whipping up your schedule! Hang tight, it's almost ready 📅\n`);

    // Call OpenAI API to create the schedule based on RODES framework
    const response = await openai.createChatCompletion({
        model: "gpt-4-0613",//updated from gpt-3.5-turbo-0613 as gpt-4 follows system roles better
        'messages': [
            { 'role': 'system', 'content': `${role}\n${objective}\n${details}\n${examples}\n${senseCheck}\n${tasksList}` },
            { 'role': 'user', 'content': `Organise these tasks into a weekly schedule: ${tasks}` }
        ],
        temperature: 0.5,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });

    // Retrieve content and function call from API response
    const { content } = response.data.choices[0].message;

    console.log(content + '\n');
    
})();