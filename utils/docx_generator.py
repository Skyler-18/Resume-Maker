from docx import Document
from docx.shared import Pt, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

def add_hr(doc):
    p = doc.add_paragraph()
    run = p.add_run()
    p._p.get_or_add_pPr().append(OxmlElement('w:pBdr'))
    p.paragraph_format.space_after = Pt(6)

def generate_docx(form_data, output_path):
    doc = Document()
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Times New Roman'
    font.size = Pt(11)

    def add_heading(text):
        p = doc.add_paragraph()
        run = p.add_run(text.upper())
        run.bold = True
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.space_after = Pt(4)

    def add_bullets(items):
        for item in items:
            para = doc.add_paragraph(item, style='List Bullet')
            para.paragraph_format.space_after = Pt(1)

    # Name
    name_p = doc.add_paragraph(form_data.get('your_name', '').upper())
    name_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    name_p.runs[0].font.size = Pt(18)
    name_p.runs[0].bold = True
    # Contact
    contact = []
    if form_data.get('email'): contact.append(f"Email: {form_data['email']}")
    if form_data.get('linkedin'): contact.append(f"LinkedIn: {form_data['linkedin']}")
    if form_data.get('github'): contact.append(f"GitHub: {form_data['github']}")
    if form_data.get('website'): contact.append(f"Website: {form_data['website']}")
    if form_data.get('phone'): contact.append(f"Phone: {form_data['phone']}")
    c_p = doc.add_paragraph(' | '.join(contact))
    c_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    c_p.paragraph_format.space_after = Pt(10)

    # Summary
    if form_data.get('summary'):
        add_heading('Summary')
        doc.add_paragraph(form_data['summary']).paragraph_format.space_after = Pt(8)
        add_hr(doc)

    # Education
    from utils.pdf_generator import parse_education, parse_experience, parse_projects, parse_skills, parse_certifications, parse_activities, parse_publications, parse_custom_section
    education = parse_education(form_data)
    if education:
        add_heading('Education')
        table = doc.add_table(rows=0, cols=2)
        table.autofit = True
        for edu in education:
            row = table.add_row().cells
            row[0].text = edu['institute']
            row[0].paragraphs[0].runs[0].bold = True
            row[1].text = f"{edu['city']}, {edu['state']}"
            row2 = table.add_row().cells
            row2[0].text = f"{edu['degree']} — {edu['branch']}"
            row2[0].paragraphs[0].runs[0].italic = True
            row2[1].text = f"{edu['start']} – {edu['end']}"
        doc.add_paragraph().paragraph_format.space_after = Pt(8)
        add_hr(doc)

    # Experience
    experience = parse_experience(form_data)
    if experience:
        add_heading('Experience')
        for exp in experience:
            table = doc.add_table(rows=0, cols=2)
            table.autofit = True
            row = table.add_row().cells
            row[0].text = exp['role']
            row[0].paragraphs[0].runs[0].bold = True
            row[1].text = f"{exp['start']} – {exp['end']}"
            row2 = table.add_row().cells
            row2[0].text = f"{exp['org']}"
            row2[0].paragraphs[0].runs[0].italic = True
            row2[1].text = f"{exp['city']}, {exp['state']}"
            if exp['bullets']:
                para = doc.add_paragraph()
                para.paragraph_format.left_indent = Inches(0.25)
                add_bullets(exp['bullets'])
        doc.add_paragraph().paragraph_format.space_after = Pt(8)
        add_hr(doc)

    # Projects
    projects = parse_projects(form_data)
    if projects:
        add_heading('Projects')
        for proj in projects:
            table = doc.add_table(rows=0, cols=2)
            table.autofit = True
            row = table.add_row().cells
            row[0].text = proj['name']
            row[0].paragraphs[0].runs[0].bold = True
            row[1].text = f"{proj['start']} – {proj['end']}"
            if proj['tech']:
                tech_p = doc.add_paragraph(f"{proj['tech']}")
                tech_p.paragraph_format.left_indent = Inches(0.25)
                tech_p.runs[0].italic = True
            if proj['bullets']:
                para = doc.add_paragraph()
                para.paragraph_format.left_indent = Inches(0.25)
                add_bullets(proj['bullets'])
        doc.add_paragraph().paragraph_format.space_after = Pt(8)
        add_hr(doc)

    # Technical Skills
    skills = parse_skills(form_data)
    if skills:
        add_heading('Technical Skills')
        for skill in skills:
            doc.add_paragraph(f"{skill['heading']}: {skill['skills']}")
        doc.add_paragraph().paragraph_format.space_after = Pt(8)
        add_hr(doc)

    # Certifications
    certifications = parse_certifications(form_data)
    if certifications:
        add_heading('Certifications')
        for cert in certifications:
            doc.add_paragraph(f"{cert['name']} — {cert['org']}")
        doc.add_paragraph().paragraph_format.space_after = Pt(8)
        add_hr(doc)

    # Co-curricular Activities
    co_curricular = parse_activities(form_data, 'co')
    if co_curricular:
        add_heading('Co-curricular Activities')
        for act in co_curricular:
            table = doc.add_table(rows=0, cols=2)
            table.autofit = True
            row = table.add_row().cells
            row[0].text = act['activity']
            row[0].paragraphs[0].runs[0].bold = True
            row[1].text = f"{act['start']} – {act['end']}"
            row2 = table.add_row().cells
            row2[0].text = f"{act['org']}"
            row2[0].paragraphs[0].runs[0].italic = True
            row2[1].text = f"{act['city']}, {act['state']}"
            if act['bullets']:
                para = doc.add_paragraph()
                para.paragraph_format.left_indent = Inches(0.25)
                add_bullets(act['bullets'])
        doc.add_paragraph().paragraph_format.space_after = Pt(8)
        add_hr(doc)

    # Extra-curricular Activities
    extra_curricular = parse_activities(form_data, 'extra')
    if extra_curricular:
        add_heading('Extra-curricular Activities')
        for act in extra_curricular:
            table = doc.add_table(rows=0, cols=2)
            table.autofit = True
            row = table.add_row().cells
            row[0].text = act['activity']
            row[0].paragraphs[0].runs[0].bold = True
            row[1].text = f"{act['start']} – {act['end']}"
            row2 = table.add_row().cells
            row2[0].text = f"{act['org']}"
            row2[0].paragraphs[0].runs[0].italic = True
            row2[1].text = f"{act['city']}, {act['state']}"
            if act['bullets']:
                para = doc.add_paragraph()
                para.paragraph_format.left_indent = Inches(0.25)
                add_bullets(act['bullets'])
        doc.add_paragraph().paragraph_format.space_after = Pt(8)
        add_hr(doc)

    # Publications
    publications = parse_publications(form_data)
    if publications:
        add_heading('Publications (If Any)')
        for pub in publications:
            doc.add_paragraph(f'"{pub["title"]}" {pub["author"]}, {pub["journal"]}, {pub["date"]}')
        doc.add_paragraph().paragraph_format.space_after = Pt(8)
        add_hr(doc)

    # Custom Section
    custom_section = parse_custom_section(form_data)
    if custom_section:
        add_heading(custom_section['heading'])
        add_bullets(custom_section['points'])

    doc.save(output_path) 