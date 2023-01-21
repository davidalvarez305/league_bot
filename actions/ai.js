import axios from "axios";
import { OPENAI_KEY } from "../constants.js";

export function getPrompt(msg) {
    return msg.split("$asere image ")[1];
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
