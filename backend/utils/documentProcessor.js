import mammoth from 'mammoth';
import { createRequire } from 'module'; 

// Use a dynamic import for pdf-parse to avoid the auto-loading test file
const requirePdfParse = async () => {
  try {
    // Create a directory structure for the test file
    const fs = await import('fs/promises');
    const path = await import('path');
    const testDir = path.join(process.cwd(), 'test', 'data');
    
    try {
      await fs.mkdir(testDir, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') {
        console.error('Error creating test directory:', err);
      }
    }

    // Create an empty test file to satisfy pdf-parse's requirements
    const testFile = path.join(testDir, '05-versions-space.pdf');
    try {
      await fs.writeFile(testFile, 'test file');
    } catch (err) {
      console.error('Error creating test file:', err);
    }
    
    // Now that we've created the required file, we can import pdf-parse
    const require = createRequire(import.meta.url);
    return require('pdf-parse');
  } catch (err) {
    console.error('Failed to load pdf-parse:', err);
    return null;
  }
};

/**
 * Process and extract text from different document types (PDF, DOCX, TXT)
 * @param {Buffer} buffer - The file buffer
 * @param {String} fileType - MIME type of the file
 * @returns {Promise<string>} Extracted text content
 */
export const extractTextFromDocument = async (buffer, fileType) => {
  try {
    let text = '';
    
    if (fileType.includes('pdf')) {
      // Process PDF files
      const pdfParse = await requirePdfParse();
      
      if (pdfParse) {
        try {
          const pdfData = await pdfParse(buffer);
          text = pdfData.text;
        } catch (pdfError) {
          console.error('Error parsing PDF with pdf-parse:', pdfError);
          // Fallback to a simpler text extraction
          text = buffer.toString('utf8').replace(/[^\x20-\x7E]/g, ' ');
        }
      } else {
        // Fallback if pdf-parse couldn't be loaded
        text = "PDF parsing is currently unavailable. Please upload a text or Word document instead.";
      }
    } else if (fileType.includes('docx') || fileType.includes('doc')) {
      // Process Word documents
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (fileType.includes('text/plain')) {
      // Process plain text files
      text = buffer.toString('utf8');
    } else {
      throw new Error(`Unsupported file type: ${fileType}`);
    }
    
    return text;
  } catch (error) {
    console.error(`Error extracting text from document: ${error.message}`);
    throw error;
  }
};