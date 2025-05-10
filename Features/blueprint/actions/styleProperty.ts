"use server";
import { promises as fs } from "fs";

export async function readStylePropertyFromJSON() {
  try {
    const filePath = process.cwd() + "/app/data/style-properties.json";
    const file = await fs.readFile(filePath, "utf8");
    return JSON.parse(file);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return null; // Prevents app crashes
  }
}
