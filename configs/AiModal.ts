const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "write a script to generate 30 second video on topic : interesting historical story along with ai image prompt in realistic format for each scene and give me result in json format with imagePrompt and contentText as field",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '## 30-Second Historical Story Video Script (JSON Format)\n\n```json\n[\n  {\n    "imagePrompt": "A bustling marketplace in ancient Rome, with people selling goods, merchants haggling, and crowds of people moving around. Focus on a young woman with a basket of fruit.",\n    "contentText": "In the heart of ancient Rome, amidst the vibrant chaos of the Forum, lived a young woman named Livia. She wasn\'t royalty or a noblewoman, but a simple fruit seller, known for her kindness and honesty."\n  },\n  {\n    "imagePrompt": "A Roman soldier in full armor standing guard outside a magnificent building, with the sun shining brightly on his helmet and shield. Close-up on his face, with a determined expression.",\n    "contentText": "One day, a Roman soldier, Marcus, entered her stall, his face etched with worry."\n  },\n  {\n    "imagePrompt": "Livia and Marcus inside a dimly lit tavern, talking quietly. Livia is looking at Marcus with concern while he gestures with his hands. ",\n    "contentText": "He confided in Livia, telling her about a plot to overthrow the emperor, and how he needed to warn him."\n  },\n  {\n    "imagePrompt": "A dramatic scene of a crowd gathered outside the Emperor\'s palace, with soldiers and guards in full armor. Livia is among the crowd, her face filled with anxiety.",\n    "contentText": "Livia knew the danger, but she was a woman of courage. She decided to help Marcus."\n  },\n  {\n    "imagePrompt": "Close-up on Livia\'s hand holding a small, intricately carved wooden bird. She smiles at Marcus, who looks back at her with gratitude.",\n    "contentText": "Using her knowledge of the city\'s secret pathways, Livia devised a plan. She crafted a tiny wooden bird, a symbol of freedom, and gave it to Marcus."\n  },\n  {\n    "imagePrompt": "Marcus running through the bustling streets of Rome, with the wooden bird clutched in his hand. He skillfully avoids the guards and reaches the palace gates. ",\n    "contentText": "Marcus, using the bird as a distraction, managed to reach the emperor\'s chamber and warn him of the plot."\n  },\n  {\n    "imagePrompt": "The Emperor sitting on his throne, looking serious as he listens to Marcus\'s warning. Close-up on the wooden bird placed on the table beside him.",\n    "contentText": "The emperor, grateful for Livia\'s bravery, praised her and Marcus for their courage and saved Rome from a dangerous rebellion."\n  },\n  {\n    "imagePrompt": "A wide shot of the Roman Forum, with the sun setting in the background. Livia is standing in her stall, smiling, surrounded by the grateful citizens of Rome.",\n    "contentText": "Livia, the humble fruit seller, became a symbol of hope and bravery in ancient Rome, proving that even the smallest actions can have the greatest impact."\n  }\n]\n```\n\n**Note:**\n\n* This script is designed for a 30-second video and can be adapted to fit different timeframes.\n* The image prompts are tailored to create visually engaging scenes that enhance the storytelling.\n* The content text provides a clear narrative and helps to guide the video\'s pacing and direction.\n* You can use AI image generators like Midjourney, DALL-E 2, or Stable Diffusion to generate the images based on the prompts.\n\nRemember to experiment with different AI models and image prompts to achieve the desired visual style for your video.',
        },
      ],
    },
  ],
});
