from flask import Flask, render_template, request, send_from_directory, redirect, url_for, flash, jsonify
from utils.pdf_generator import generate_pdf
from utils.docx_generator import generate_docx
import os
# import uuid
import datetime



app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Needed for flash messages
# GENERATED_FOLDER = os.path.join('static', 'generated')
GENERATED_FOLDER = os.path.join('/tmp/generated')  # Use a temporary directory for generated files
# Ensure the generated folder exists at startup (for all environments)
if not os.path.exists(GENERATED_FOLDER):
    os.makedirs(GENERATED_FOLDER)

# Serve /favicon.ico from static folder for browser compatibility
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/x-icon')

# Landing page
@app.route('/', methods=['GET'])
def landing():
    return render_template('landing.html')

# Resume form page (old root)
@app.route('/resume', methods=['GET'])
def resume_form():
    return render_template('index.html')


@app.route('/generate', methods=['POST'])
def generate():
    form_data = request.form.to_dict(flat=False)
    # Flatten single-value lists
    for k, v in form_data.items():
        if len(v) == 1:
            form_data[k] = v[0]

    now = datetime.datetime.now().strftime('%d%m%Y_%H%M%S')
    filename = f"{now}_Resume.pdf"
    output_path = os.path.join(GENERATED_FOLDER, filename)
    # Generate PDF
    generate_pdf(form_data, output_path)
    return redirect(url_for('download', filename=filename))


@app.route('/generate-docx', methods=['POST'])
def generate_docx_route():
    form_data = request.form.to_dict(flat=False)
    for k, v in form_data.items():
        if len(v) == 1:
            form_data[k] = v[0]
    import datetime
    user_filename = form_data.get('filename', None)
    if user_filename:
        user_filename = user_filename.replace(' ', '_').replace('/', '_').replace('\\', '_')
        if not user_filename.lower().endswith('.docx'):
            user_filename += '.docx'
        filename = user_filename
    else:
        now = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"{now}_Resume.docx"
    output_path = os.path.join(GENERATED_FOLDER, filename)
    generate_docx(form_data, output_path)
    return jsonify({'url': url_for('download', filename=filename)})


@app.route('/download/<filename>')
def download(filename):
    return send_from_directory(GENERATED_FOLDER, filename, as_attachment=True)

# Route to serve the demo resume PDF from templates folder
@app.route('/demo-resume')
def demo_resume():
    # Demo-Resume.pdf is in templates folder
    demo_path = os.path.join(app.root_path, 'templates', 'Demo-Resume.pdf')
    if not os.path.exists(demo_path):
        return "Demo resume not found.", 404
    return send_from_directory(os.path.join(app.root_path, 'templates'), 'Demo-Resume.pdf', as_attachment=False)

if __name__ == '__main__':
    if not os.path.exists(GENERATED_FOLDER):
        os.makedirs(GENERATED_FOLDER)
    app.run(debug=True)
    # app.run(host="0.0.0.0", port=5000, debug=True)