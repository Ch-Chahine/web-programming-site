#import
import re
from datetime import date
from xml.parsers.expat import errors
#regex patterns
STUDENT_ID = re.compile(r"^\d{9}$")
FULLNAME = re.compile(r"^[A-Za-z][A-Za-z .'\-]{1,79}$")
EMAIL = re.compile(r"^[A-Za-z0-9._%+-]+@net\.usek\.edu\.lb$")
PHONE = re.compile(r"^\+961 [0-9]{2} [0-9]{6}$")
GITHUB = re.compile(r"^https://github\.com/[A-Za-z0-9-]+/?$")
HTTPS_URL = re.compile(r"^https://[A-Za-z0-9.-]+(?:/[A-Za-z0-9._~:/?#\[\]@!$&'()*+,;=%-]*)?$")
MONTH = re.compile(r"^\d{4}-\d{2}$")
TIME = re.compile(r"^\d{2}:\d{2}$")
HEXCOLOR = re.compile(r"^#[0-9A-Fa-f]{6}$")

#  Allow-Lists
SKILLS = { "Programming","Embedded Systems","Electronics","Computer Networks","Telecommunications","Biomedical Instrumentation","Artificial Intelligence / Machine Learning","Signal Processing"}
MAJORS = {"Computer Engineering","Electrical Engineering","Biomedical Engineering","Telecommunications Engineering"}
SOFTWARE = {"MATLAB", "Multisim", "AutoCAD", "SolidWorks", "LabVIEW", "Cisco Packet Tracer"}
PROJECT_AREAS = {"Software Engineering", "Cybersecurity", "Embedded Systems", "Power Systems", "Renewable Energy", "Control Systems", "Medical Devices", "Biomedical Imaging", "Health Informatics", "Wireless Networks", "5G/6G", "Network Security"}
GRADUATION = {"Spring", "Summer", "Fall"}
YESNO = {"Yes", "No"}
REQUIRED = {"student_id", "fullname", "email", "major", "graduation"}

def parse_date(text):
  try:
     return date.fromisoformat(text)
    # ISO YYY-MM-DD  
  except ValueError:
     return None


def to_number(text):
    try:
       return float(text)
    except ValueError:
       return None

def to_int(text):
    try:
        return int(text)
    except ValueError:
        return None


    
#validation function
def validate_profile(form):
    #creating errors and cleaned dictionaries to store validation results
    errors = {}
    cleaned = {}

#getting the users values and checking if they are valid
    for field in REQUIRED:
      if form.get(field, "").strip() == "":
       errors[field] = "This field is required."
  

    student_id = form.get("student_id", "").strip()
    if student_id and not STUDENT_ID.match(student_id):
     errors["student_id"] = "Student ID must be exactly 9 digits."
    cleaned["student_id"] = student_id

    fullname = form.get("fullname", "").strip()
    if fullname and not FULLNAME.match(fullname):
         errors["fullname"] = "Full name contains invalid characters."
    cleaned["fullname"] = fullname   

    email = form.get("email", "").strip()
    if email and not EMAIL.match(email):
        errors["email"] = "Invalid USEK email."
    cleaned["email"] = email

    phone = form.get("phone", "").strip()
    if phone and not PHONE.match(phone):
        errors["phone"] = "Invalid phone number format."
    cleaned["phone"] = phone

    github = form.get("portfolio", "").strip()
    if github and not GITHUB.match(github):
        errors["portfolio"] = "Invalid GitHub URL."
    cleaned["portfolio"] = github    

    gin446 = form.get("gin446", "").strip()        
    if gin446 and not HTTPS_URL.match(gin446):
        errors["gin446"] = "Invalid HTTPS URL."
    cleaned["gin446"] = gin446    

   
    birthdate = form.get("birthdate", "").strip()
    if birthdate != "":
      day = parse_date(birthdate)
      if day is None:   
       errors["birthdate"] = "Not a valid date."
      elif day > date.today():
       errors["birthdate"] = "Date of birth cannot be in the future."
      else: 
       age = (date.today() - day).days // 365
      if age < 15 or age > 100:
       errors["birthdate"] = "Age looks out of range."

    cleaned["birthdate"] = birthdate   


    major = form.get("major", "").strip()
    if major != "" and major not in MAJORS:
     errors["major"] = "Choose a valid major."
    cleaned["major"] = major  

    gpa = form.get("gpa", "").strip()
    if gpa != "":
     number = to_number(gpa)
     if number is None or number < 40 or number > 100:
        errors["gpa"] = "GPA must be a number between 40 and 100."
    cleaned["gpa"] = gpa

    credits = form.get("credits", "").strip()
    if credits != "":
        number = to_number(credits)
        if number is None or number < 0 or number > 148:
            errors["credits"] = "Credits must be a number between 0 and 148."
    cleaned["credits"] = credits

    graduation = form.get("graduation", "").strip()
    if graduation != "" and graduation not in GRADUATION:  
         errors["graduation"] = "Choose a valid graduation term."
    
    cleaned["graduation"] = graduation


    internship_completed = form.get("internship_completed", "").strip()   
    if internship_completed != "" and internship_completed not in YESNO:    
     errors["internship_completed"] = "Choose Yes or No."   
    cleaned["internship_completed"] = internship_completed

    graduation_month = form.get("graduation_month", "").strip() 
    if graduation_month != "" and not MONTH.match(graduation_month):
     errors["graduation_month"] = "Invalid graduation month."
    cleaned["graduation_month"] = graduation_month 

    language = form.get("language", "").strip()
    if len(language) > 40:
        errors["language"] = "Keep it under 40 characters."
    cleaned["language"] = language

    skills = form.getlist("skills")
    good_skills = []
    bad_skills = []
    for skill in skills:
     if skill in SKILLS:
      good_skills.append(skill)
     else:
      bad_skills.append(skill)
    if bad_skills:
     errors["skills"] = "Unknown skill(s): " + ", ".join(bad_skills)
    cleaned["skills"] = good_skills


    software = form.getlist("software")
    good_software = []
    bad_software = []
    for item in software:
     if item in SOFTWARE:
      good_software.append(item)
     else:
      bad_software.append(item)
    if bad_software:
     errors["software"] = "Unknown software(s): " + ", ".join(bad_software)
    cleaned["software"] = good_software


    project_title = form.get("project_title", "").strip()
    if len(project_title) > 120:
        errors["project_title"] = "Project title is too long."
    cleaned["project_title"] = project_title

    project_area = form.get("project_area", "").strip()
    if project_area != "" and project_area not in PROJECT_AREAS:
        errors["project_area"] = "Choose a valid project area."
    cleaned["project_area"] = project_area

    description = form.get("description", "").strip()
    if len(description) > 1000:
        errors["description"] = "Description is too long."
    cleaned["description"] = description

    team_size = form.get("team_size", "").strip()
    if team_size != "":
        number = to_int(team_size)
        if number is None or number < 1 or number > 4:
            errors["team_size"] = "Team size must be a whole number from 1 to 4."
    cleaned["team_size"] = team_size

    project_color = form.get("project_color", "").strip()
    if project_color != "" and not HEXCOLOR.match(project_color):
     errors["project_color"] = "Use a colour like #336699."
    if project_color == "":
     project_color = "#336699"
    cleaned["project_color"] = project_color


    meeting_date = form.get("meeting_date", "").strip()
    if meeting_date != "":
        day = parse_date(meeting_date)
        if day is None:
         errors["meeting_date"] = "Not a valid date."
        elif day < date.today():
         errors["meeting_date"] = "Meeting date cannot be in the past."
    cleaned["meeting_date"] = meeting_date

    meeting_time = form.get("meeting_time", "").strip()

    if meeting_time != "" and not TIME.match(meeting_time):
        errors["meeting_time"] = "Use HH:MM."

    if meeting_time != "" and TIME.match(meeting_time):
        hour, minute = map(int, meeting_time.split(":"))

        if hour < 8 or hour > 18:
            errors["meeting_time"] = "Pick a time between 08:00 and 18:00."

    cleaned["meeting_time"] = meeting_time

    confirmation = form.get("confirmation", "").strip()
    if confirmation != "Yes":
        errors["confirmation"] = "You must confirm the information is accurate."
    cleaned["confirmation"] = confirmation

    return errors, cleaned
