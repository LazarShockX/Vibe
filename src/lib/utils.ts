import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { TreeItem } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert a record of files to a tree structure.
 * @param files - Record of file paths to content.
 * @returns Tree structure for TreeView component.
 * 
 * @example
 * Input: { "src/Button.tsx": "...", "README.md": "..." }
 * Output: [["src", "Button.tsx"], "README.md"]
 */
export function convertFilesToTreeItems(files: { [path: string]: string }): TreeItem[] {
  interface TreeNode {
    [key: string]: TreeNode | null;
  }

  const tree: TreeNode = {};

  const sortedPaths = Object.keys(files).sort();

  for (const filePath of sortedPaths) {
    const parts = filePath.split("/");
    let currentNode = tree;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!currentNode[part]) {
        currentNode[part] = {};
      }

      currentNode = currentNode[part];
    }

    const fileName = parts[parts.length - 1];
    currentNode[fileName] = null;
  }

  function convertNode(node: TreeNode, name?: string): TreeItem[] | TreeItem {
    const entries = Object.entries(node);

    if (entries.length === 0) {
      return name || "";
    }

    const children: TreeItem[] = [];

    for (const [key, childNode] of entries) {
      if (childNode === null) {
        // It's a file
        children.push(key);
      } else {
        // It's a folder
        const subtree = convertNode(childNode, key);
        if (Array.isArray(subtree)) {
          children.push([key, ...subtree]);
        } else {
          children.push([key, subtree]);
        }
      }
    }

    return children;
  }

  const result = convertNode(tree);
  return Array.isArray(result) ? result : [result];
}
