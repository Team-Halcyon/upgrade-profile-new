from dotenv import load_dotenv

load_dotenv()
import base64
import os
import io
from PIL import Image 
import pdf2image
import google.generativeai as genai

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def get_gemini_response(input,pdf_content,prompt):
    model=genai.GenerativeModel('gemini-pro-vision')
    response=model.generate_content([input,pdf_content[0],prompt])
    return response.text

def input_pdf_setup(uploaded_file):
    if uploaded_file is not None:
        ## Convert the PDF to image
        images=pdf2image.convert_from_bytes(uploaded_file.read())

        first_page=images[0]

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
You are an expert career advisor and job search specialist. Analyze this resume/CV and extract the most relevant search keywords and phrases that should be used in job search platforms like RemoteOK, Indeed, or LinkedIn Jobs.

Based on the candidate's skills, experience, job titles, and qualifications shown in this resume, generate a list of effective job search phrases that would help find the most suitable remote job opportunities.

Instructions:
1. Focus on technical skills, programming languages, frameworks, and tools mentioned
2. Include relevant job titles and role variations
3. Consider experience level (junior, senior, lead, etc.)
4. Include industry-specific terms and methodologies
5. Add both specific technologies and broader categories
6. Consider remote work keywords where applicable

Return ONLY a Python list format with search phrases, like this:
["search phrase 1", "search phrase 2", "search phrase 3", ...]

Do not include any explanations, just the list of search phrases that can be directly used in job search platforms.
"""


def return_search_phrases(uploaded_file): 
    """Extract job search phrases from uploaded CV for RemoteOK platform"""
    if uploaded_file is not None:
        try:
            pdf_content = input_pdf_setup(uploaded_file)
            raw_response = get_gemini_response(input_prompt_keywords, pdf_content, "")
            
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



