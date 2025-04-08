from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import time
import os

# You can load from .env in a real setup
LINKEDIN_EMAIL = os.getenv("LINKEDIN_EMAIL", "your_email@example.com")
LINKEDIN_PASSWORD = os.getenv("LINKEDIN_PASSWORD", "your_password")

def scrape_linkedin_profile(linkedin_url):
    # Set up Chrome options
    options = Options()
    options.headless = True
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument("--window-size=1920,1080")
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')

    # Initialize WebDriver
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    try:
        # Step 1: Log in to LinkedIn
        driver.get("https://www.linkedin.com/login")
        time.sleep(2)

        email_input = driver.find_element(By.ID, "username")
        password_input = driver.find_element(By.ID, "password")

        email_input.send_keys(LINKEDIN_EMAIL)
        password_input.send_keys(LINKEDIN_PASSWORD)
        password_input.send_keys(Keys.RETURN)
        time.sleep(3)

        # Step 2: Navigate to the target LinkedIn profile
        driver.get(linkedin_url)
        time.sleep(5)

        # Step 3: Scrape profile info
        try:
            name = driver.find_element(By.CSS_SELECTOR, 'h1.text-heading-xlarge').text
        except:
            name = "N/A"

        try:
            headline = driver.find_element(By.CSS_SELECTOR, 'div.text-body-medium.break-words').text
        except:
            headline = "N/A"

        try:
            location = driver.find_element(By.CSS_SELECTOR, 'span.text-body-small.inline.t-black--light.break-words').text
        except:
            location = "N/A"

        try:
            about_section = driver.find_element(By.ID, 'about').text
        except:
            about_section = "N/A"

        # Experience
        experiences = []
        try:
            experience_cards = driver.find_elements(By.CSS_SELECTOR, 'li.artdeco-list__item')
            for card in experience_cards[:5]:
                try:
                    title = card.find_element(By.CSS_SELECTOR, 'span.mr1.t-bold').text
                    company = card.find_element(By.CSS_SELECTOR, 'span.t-14.t-normal').text
                    experiences.append(f"{title} at {company}")
                except:
                    continue
        except:
            experiences = []

        profile_data = {
            'name': name,
            'headline': headline,
            'location': location,
            'about': about_section,
            'experience': experiences
        }

        return profile_data

    except Exception as e:
        print(f"[ERROR] {e}")
        return {'error': 'Failed to scrape profile'}

    finally:
        driver.quit()
