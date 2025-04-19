"use server";

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";

export async function extractTextFromFile(file) {
  try {
    const fileType = file.type;
    const fileArrayBuffer = await file.arrayBuffer();

    if (fileType === "application/pdf") {
      const loader = new PDFLoader(new Blob([fileArrayBuffer]));
      const docs = await loader.load();
      return docs.map((doc) => doc.pageContent).join("\n");
    } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const loader = new DocxLoader(new Blob([fileArrayBuffer]));
      const docs = await loader.load();
      return docs.map((doc) => doc.pageContent).join("\n");
    } else if (fileType === "text/plain") {
      return new TextDecoder().decode(fileArrayBuffer);
    } else {
      throw new Error(`Unsupported file type: ${fileType}`);
    }
  } catch (error) {
    console.error("Error extracting text from file:", error);
    throw error;
  }
}
