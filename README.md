# Placement Cell Service for Skill Brew Application
This Placement Cell Service is designed as a secondary feature for the Skill Brew application, which is built on Django and utilizes PostgreSQL as the database management system. The Placement Cell Service aims to facilitate the process of job placement for users of the Skill Brew platform.

## Directory Structure
The directory structure of the Placement Cell Service is organized as follows:
```bash
.
├── README.md
├── api
│   ├── __init__.py
│   ├── __pycache__
│   │   └── ...
│   ├── apps.py
│   └── v1
│       ├── __pycache__
│       │   └── ...
│       └── urls.py
├── applicants
│   ├── __init__.py
│   ├── __pycache__
│   │   └── ...
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   │   └── ...
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   └── views.py
├── attachments
│   ├── __init__.py
│   ├── __pycache__
│   │   └── ...
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   │   └── ...
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   └── views.py
├── jobs
│   ├── __init__.py
│   ├── __pycache__
│   │   └── ...
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   └── views.py
├── manage.py
├── marketing
│   ├── __init__.py
│   ├── __pycache__
│   │   └── ...
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   │   └── ...
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   └── views.py
├── placement_cell
│   ├── __init__.py
│   ├── __pycache__
│   │   └── ...
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── pytest.ini
└── requirements.txt
``` 

## Components
- API: Contains modules for handling API requests, including versioning.
- Applicants: Manages applicant-related functionalities such as models, views, serializers, and tests.
- Attachments: Deals with attachment-related features such as uploading resumes or other relevant documents.
- Jobs: Handles job-related functionalities including models, views, and tests.
- Marketing: Manages marketing-related functionalities such as models, views, serializers, and tests.
- Placement Cell: Core module containing settings, URLs, and middleware configurations for the Placement Cell Service.

## Generate Fake Data
- To create fake data run the following command
```shell
python manage.py generate_fake_data <count>
```
- count is nomber of records you want in each table
- eg 
```shell
python manage.py generate_fake_data 100
```

# Use NLP for matching resumes with JD

Obtain Google API key from : https://aistudio.google.com/app/apikey
place it in .env like (GOOGLE_API_KEY = YOUR_API_KEY)
1. CD NLP
2. CD src
3. CD TFIDF_APPROACH
4. run app.py

# For Testing
1. open postman.
2. Go on Body. -> select Form data.
3. make 2 keys 'resume' and 'job_description' select type of both as file.
4. make a POST request on it.

## Contributers

- [Dhruv Soni](https://github.com/Dhruv-net)
- [Hridesh Sharma](https://github.com/hridesh-net)

<span style='background-color: #B1C4A9;'>Python Expert</span>