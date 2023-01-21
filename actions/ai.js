import axios from "axios";
import { OPENAI_KEY } from "../constants.js";

export function getPrompt(msg) {
    if (msg.includes("image")) {
        return msg.split("$asere image ")[1];
    }
    if (msg.includes("text")) {
        return msg.split("$asere text ")[1];
    }
}

export async function handleRequestImage(prompt) {
  const API_URL = "https://api.openai.com/v1/images/generations";
  const AUTH_HEADER = "Bearer " + OPENAI_KEY;

  try {
    const response = await axios({
      url: API_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTH_HEADER,
      },
      data: {
        prompt: prompt,
        n: 2,
        size: "1024x1024",
      },
    });

    return response.data.data[0].url;
  } catch (err) {
    console.error(err.response);
  }
}

export async function handleRequestText(prompt) {
  const API_URL = "https://api.openai.com/v1/completions";
  const AUTH_HEADER = "Bearer " + OPENAI_KEY;

  try {
    const response = await axios({
      url: API_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTH_HEADER,
      },
      data: {
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.6,
      },
    });

    return response.data.choices[0].text;
  } catch (err) {
    console.error(err.response);
  }
}
