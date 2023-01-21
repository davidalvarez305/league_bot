import axios from "axios";
import { OPENAI_KEY } from "../constants.js";
export class AiClient {
  constructor() {}

  async fetchData(url, data) {
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

  getPrompt(msg) {
    if (msg.includes("image")) {
      return msg.split("$asere image ")[1];
    }
    if (msg.includes("text")) {
      return msg.split("$asere text ")[1];
    }
  }

  async handleRequestImage(prompt) {
    const API_URL = "https://api.openai.com/v1/images/generations";

    try {
      const response = await this.fetchData(API_URL, {
        prompt: prompt,
        n: 2,
        size: "1024x1024",
      });

      return response.data[0].url;
    } catch (err) {
      console.error(err.response);
    }
  };

  async handleRequestText(prompt) {
    const API_URL = "https://api.openai.com/v1/completions";

    try {
      const response = await this.fetchData(API_URL, {
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
}
