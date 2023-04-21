import axios from "axios";
import { OPENAI_KEY } from "../constants.js";
import { OpenAIResponse } from "../types/types";

  async function fetchData(url: string, data: any) {
    const API_URL = url;
    const AUTH_HEADER = "Bearer " + OPENAI_KEY;

    try {
      const response = await axios({
        url: API_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AUTH_HEADER,
        },
        data,
      });

      return response.data;
    } catch (err) {
      console.error(err.response);
    }
  }

  export function getPrompt(msg: string) {
    if (msg.includes("text")) {
      return msg.split("$asere text ")[1];
    }
  }

  export async function handleRequestText(prompt: string) {
    const API_URL = "https://api.openai.com/v1/completions";

    try {
      const response: OpenAIResponse = await fetchData(API_URL, {
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.6,
        max_tokens: 1000,
      });

      return response.choices[0].text;
    } catch (err) {
      console.error(err.response);
    }
  };
