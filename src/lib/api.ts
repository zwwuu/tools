import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { tools } from "~/data/tools/base";
import { Changelog } from "~/types/Changelog";

export function getToolBySlug(slug: string) {
  const prod = process.env.NODE_ENV === "production";
  return tools[slug] && (prod ? tools[slug].isPublic : true) ? tools[slug] : null;
}

export function getAllTools() {
  const prod = process.env.NODE_ENV === "production";
  const arr = Object.keys(tools)
    .map((key) => tools[key])
    .sort((a, b) => {
      return a.title > b.title ? 1 : -1;
    });
  return prod ? arr.filter((tool) => tool.isPublic) : arr;
}

export function getAllChangelogs() {
  try {
    const changelogDir = path.join("src/data/changelogs");
    const changelogs = fs.readdirSync(changelogDir);
    return changelogs
      .map((changelog) => {
        const changelogFile = fs.readFileSync(`${changelogDir}/${changelog}`);
        const { content, data } = matter(changelogFile);
        return {
          content,
          ...data,
        } as Changelog;
      })
      .sort((a, b) => {
        return new Date(a.date) > new Date(b.date) ? -1 : 1;
      });
  } catch (e) {
    return [];
  }
}
