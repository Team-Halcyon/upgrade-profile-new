from dotenv import load_dotenv
from pathlib import Path
import ast 
load_dotenv()
import base64
import os
import io
import re
from PIL import Image 
import pdf2image
import google.generativeai as genai

import PyPDF2
import io
from typing import Optional


genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def get_gemini_response(prompt,pdf_content):
    model=genai.GenerativeModel('gemini-1.5-flash')
    response=model.generate_content([prompt,pdf_content[0]])
    return response.text

def input_pdf_setup(uploaded_file):
    if uploaded_file is not None:
        ## Convert the PDF to image
        images=pdf2image.convert_from_bytes(uploaded_file.read())

        first_page=images[0]
        # Only first page is considered, since we need to generate the search ohrases and for that using the first page is enough 

        # Convert to bytes
        img_byte_arr = io.BytesIO()
        first_page.save(img_byte_arr, format='JPEG')
        img_byte_arr = img_byte_arr.getvalue()

        pdf_parts = [
            {
                "mime_type": "image/jpeg",
                "data": base64.b64encode(img_byte_arr).decode()  # encode to base64
            }
        ]
        return pdf_parts
    else:
        raise FileNotFoundError("No file uploaded")



input_prompt_keywords = """
You are an expert career advisor and HR specialist. Analyze this resume/CV and identify the most suitable job positions/titles that this candidate would be qualified for based on their skills, experience, and qualifications.

Based on the candidate's background shown in this resume, generate a list of specific job titles/positions that they should apply for on job platforms like RemoteOK, Indeed, or LinkedIn Jobs.

Instructions:
1. Focus on the candidate's actual skills, experience level, and expertise
2. Include variations of job titles (e.g., "Software Engineer", "Backend Developer", "Full Stack Developer")
3. Consider their seniority level (Junior, Mid-level, Senior, Lead, etc.)
4. Include both general and specific role titles
5. Focus on positions that match their technical stack and experience
6. Limit to 10-15 most relevant positions

Examples of good job titles:
- "Software Engineer"
- "Frontend Developer" 
- "Java Developer"
- "Senior Python Developer"
- "Full Stack Engineer"
- "Data Scientist"
- "DevOps Engineer"

Return ONLY a Python list format with job positions/titles, like this:
["job title 1", "job title 2", "job title 3", ...]

Do not include any explanations, just the list of job titles that this candidate should search for and apply to.
"""


async def return_search_phrases(uploaded_file): 
    """Extract job search phrases from uploaded CV for RemoteOK platform"""
    if uploaded_file is not None:
        try:
            file_bytes = uploaded_file
            #file_bytes = await uploaded_file.read() 
            #pdf_content = input_pdf_setup(uploaded_file)
            pdf_content = input_pdf_setup(io.BytesIO(file_bytes))
            raw_response = get_gemini_response(input_prompt_keywords, pdf_content)
            
            # Try to parse the response as a Python list
            try:
                # Extract list from response
                list_match = re.search(r'\[.*\]', raw_response, re.DOTALL)
                if list_match:
                    list_str = list_match.group()
                    search_phrases = ast.literal_eval(list_str)
                    return search_phrases
                else:
                    # Fallback: parse line by line
                    lines = raw_response.strip().split('\n')
                    phrases = []
                    for line in lines:
                        line = line.strip()
                        if line and not line.startswith(('#', '//', '*')):
                            # Clean the line
                            clean_line = re.sub(r'^[\d\.\-\*\"\'\[\]]\s*', '', line)
                            clean_line = clean_line.strip('\'".,')
                            if clean_line and len(clean_line) > 2:
                                phrases.append(clean_line)
                    return phrases[:15]  # Limit to 15 phrases
            except (ValueError, SyntaxError) as e:
                print(f"Error parsing AI response: {e}")
                return []
                
        except Exception as e:
            print(f"Error processing CV: {e}")
            return []
    else:
        print("Please upload the resume")
        return []


async def extract_text_from_pdf_pypdf2(uploaded_file) -> str:
    """
    Extract text from PDF using PyPDF2
    
    Args:
        uploaded_file: FastAPI UploadFile object or file-like object
        
    Returns:
        str: Extracted text from all pages
    """
    try:
        # Handle different input types
        if hasattr(uploaded_file, 'read'):
            # FastAPI UploadFile or file-like object
            pdf_bytes = await uploaded_file.read()
            if hasattr(uploaded_file, 'seek'):
                await uploaded_file.seek(0)  # Reset file pointer
        else:
            # Assume it's already bytes
            pdf_bytes = uploaded_file
        
        # Create a BytesIO object
        pdf_file = io.BytesIO(pdf_bytes)
        
        # Create PDF reader
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        
        # Extract text from all pages
        text = ""
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text() + "\n"
        
        # Clean up the text
        text = text.strip()
        print(text)
        if not text:
            print("Warning: No text extracted from PDF")
            return ""
        
        print(f"DEBUG: Extracted {len(text)} characters from PDF")
        return text
        
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""


# import asyncio
# # ---------- Main test driver ----------
# async def test_pdf_extraction():
#     try:
#         # Load sample PDF file
#         with open("CV_Modified.pdf", "rb") as f:
#             file_bytes = f.read()

#         print("🔍 Extracting text from 'sample.pdf'...\n")
#         extracted_text = await extract_text_from_pdf_pypdf2(file_bytes)

#         print("\n📄 Extracted Text:\n" + "-" * 40)
#         print(extracted_text)
#         print("-" * 40)

#     except FileNotFoundError:
#         print("❌ Error: 'sample.pdf' not found. Place a PDF file named 'sample.pdf' in the same directory.")

# # ---------- Entry point ----------
# if __name__ == "__main__":
#     asyncio.run(test_pdf_extraction())