from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
import os

def get_date_string(form_data, prefix, idx):
    start_month = form_data.get(f'{prefix}_start_month_{idx}', '')
    start_year = form_data.get(f'{prefix}_start_year_{idx}', '')
    end_month = form_data.get(f'{prefix}_end_month_{idx}', '')
    end_year = form_data.get(f'{prefix}_end_year_{idx}', '')
    is_present = form_data.get(f'{prefix}_end_present_{idx}', '')

    start_date = f"{start_month} {start_year}"
    end_date = "Present" if is_present else f"{end_month} {end_year}"
    return start_date, end_date

def parse_education(form_data):
    items = []
    idx = 0
    while f'education_institute_{idx}' in form_data:
        start_date, end_date = get_date_string(form_data, 'education', idx)
        items.append({
            'institute': form_data.get(f'education_institute_{idx}', ''),
            'city': form_data.get(f'education_city_{idx}', ''),
            'state': form_data.get(f'education_state_{idx}', ''),
            'degree': form_data.get(f'education_degree_{idx}', ''),
            'branch': form_data.get(f'education_branch_{idx}', ''),
            'start': start_date,
            'end': end_date,
        })
        idx += 1
    return [e for e in items if any(e.values())]

def parse_experience(form_data):
    items = []
    idx = 0
    while f'experience_role_{idx}' in form_data:
        bullets = form_data.get(f'experience_bullets_{idx}', '').split('\n')
        bullets = [b.strip() for b in bullets if b.strip()]
        start_date, end_date = get_date_string(form_data, 'experience', idx)
        items.append({
            'role': form_data.get(f'experience_role_{idx}', ''),
            'role_link': form_data.get(f'experience_role_link_${idx}', ''),
            'org': form_data.get(f'experience_org_{idx}', ''),
            'city': form_data.get(f'experience_city_{idx}', ''),
            'state': form_data.get(f'experience_state_{idx}', ''),
            'start': start_date,
            'end': end_date,
            'bullets': bullets,
        })
        idx += 1
    return [e for e in items if any(e.values())]

def parse_projects(form_data):
    items = []
    idx = 0
    while f'project_name_{idx}' in form_data:
        bullets = form_data.get(f'project_bullets_{idx}', '').split('\n')
        bullets = [b.strip() for b in bullets if b.strip()]
        start_date, end_date = get_date_string(form_data, 'project', idx)
        items.append({
            'name': form_data.get(f'project_name_{idx}', ''),
            'link': form_data.get(f'project_link_{idx}', ''),
            'tech': form_data.get(f'project_tech_{idx}', ''),
            'start': start_date,
            'end': end_date,
            'bullets': bullets,
        })
        idx += 1
    return [e for e in items if any(e.values())]

def parse_skills(form_data):
    items = []
    idx = 0
    while f'skill_heading_{idx}' in form_data:
        heading = form_data.get(f'skill_heading_{idx}', '')
        skills = form_data.get(f'skill_list_{idx}', '')
        if heading or skills:
            items.append({'heading': heading, 'skills': skills})
        idx += 1
    return items

def parse_certifications(form_data):
    items = []
    idx = 0
    while f'cert_name_{idx}' in form_data:
        items.append({
            'name': form_data.get(f'cert_name_{idx}', ''),
            'org': form_data.get(f'cert_org_{idx}', ''),
            'link': form_data.get(f'cert_link_{idx}', ''),
        })
        idx += 1
    return [e for e in items if any(e.values())]

def parse_activities(form_data, prefix):
    items = []
    idx = 0
    while f'{prefix}_activity_{idx}' in form_data:
        bullets = form_data.get(f'{prefix}_bullets_{idx}', '').split('\n')
        bullets = [b.strip() for b in bullets if b.strip()]
        start_date, end_date = get_date_string(form_data, prefix, idx)
        items.append({
            'activity': form_data.get(f'{prefix}_activity_{idx}', ''),
            'link': form_data.get(f'{prefix}_link_{idx}', ''),
            'org': form_data.get(f'{prefix}_org_{idx}', ''),
            'city': form_data.get(f'{prefix}_city_{idx}', ''),
            'state': form_data.get(f'{prefix}_state_{idx}', ''),
            'start': start_date,
            'end': end_date,
            'bullets': bullets,
        })
        idx += 1
    return [e for e in items if any(e.values())]

def parse_publications(form_data):
    items = []
    idx = 0
    while f'pub_title_{idx}' in form_data:
        items.append({
            'title': form_data.get(f'pub_title_{idx}', ''),
            'link': form_data.get(f'pub_link_{idx}', ''),
            'author': form_data.get(f'pub_author_{idx}', ''),
            'journal': form_data.get(f'pub_journal_{idx}', ''),
            'date': form_data.get(f'pub_date_{idx}', ''),
        })
        idx += 1
    return [e for e in items if any(e.values())]

def parse_custom_section(form_data):
    heading = form_data.get('custom_heading', '')
    points = form_data.get('custom_points', '').split('\n')
    points = [p.strip() for p in points if p.strip()]
    if heading and points:
        return {'heading': heading, 'points': points}
    return None

def format_name(name_str):
    parts = name_str.split()
    formatted_parts = []
    for part in parts:
        if part:
            first_letter = f'<span class="first-letter">{part[0]}</span>'
            rest = part[1:]
            formatted_parts.append(f'{first_letter}{rest}')
    return ' '.join(formatted_parts)

def generate_pdf(form_data, output_path):
    env = Environment(loader=FileSystemLoader('templates'))
    template = env.get_template('template.html')
    name_str = form_data.get('your_name', '')
    context = {
        'your_name': name_str,
        'name_html': format_name(name_str),
        'phone': form_data.get('phone', ''),
        'email': form_data.get('email', ''),
        'linkedin': form_data.get('linkedin', ''),
        'github': form_data.get('github', ''),
        'website': form_data.get('website', ''),
        'summary': form_data.get('summary', ''),
        'education': parse_education(form_data),
        'experience': parse_experience(form_data),
        'projects': parse_projects(form_data),
        'skills': parse_skills(form_data),
        'certifications': parse_certifications(form_data),
        'co_curricular': parse_activities(form_data, 'co'),
        'extra_curricular': parse_activities(form_data, 'extra'),
        'publications': parse_publications(form_data),
        'custom_section': parse_custom_section(form_data),
    }
    html_out = template.render(**context)
    HTML(string=html_out, base_url=os.getcwd()).write_pdf(output_path)