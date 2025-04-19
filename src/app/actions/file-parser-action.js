'use server';

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";

/**
 * Server action to extract text from files
 * This keeps Node.js specific operations on the server
 */
export async function extractTextFromFileAction(fileBuffer, fileType) {
  try {
    if (fileType === "application/pdf") {
      const loader = new PDFLoader(new Blob([fileBuffer]));
      const docs = await loader.load();
      return docs.map((doc) => doc.pageContent).join("\n");
    } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const loader = new DocxLoader(new Blob([fileBuffer]));
      const docs = await loader.load();
      return docs.map((doc) => doc.pageContent).join("\n");
    } else if (fileType === "text/plain") {
      return new TextDecoder().decode(fileBuffer);
    } else {
      throw new Error(`Unsupported file type: ${fileType}`);
    }
  } catch (error) {
    console.error("Error extracting text from file:", error);
    throw error;
  }
}