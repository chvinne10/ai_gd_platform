from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
import os

def generate_pdf_report(user_data, analysis_results):
    # Filename: e.g., result_vinay_123.pdf
    filename = f"report_{user_data['username']}.pdf"
    filepath = os.path.join('media/reports/', filename)
    
    c = canvas.Canvas(filepath, pagesize=letter)
    width, height = letter

    # Header
    c.setFillColor(colors.hexColor("#2563eb"))
    c.rect(0, height - 80, width, 80, fill=1)
    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(50, height - 50, "AI Group Discussion Report")

    # User Info
    c.setFillColor(colors.black)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, height - 120, f"Candidate: {user_data['username']}")
    c.setFont("Helvetica", 12)
    c.drawString(50, height - 140, f"Topic: {analysis_results['topic']}")

    # Scores Section
    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, height - 180, "Performance Scores")
    c.setStrokeColor(colors.lightgrey)
    c.line(50, height - 185, 550, height - 185)

    y_pos = height - 210
    metrics = [
        ("Speaking Score", analysis_results['speaking']),
        ("Communication", analysis_results['communication']),
        ("Behavior Score", analysis_results['behavior'])
    ]

    for label, score in metrics:
        c.setFont("Helvetica", 12)
        c.drawString(50, y_pos, f"{label}:")
        # Draw a small bar
        c.setFillColor(colors.lightgrey)
        c.rect(200, y_pos - 2, 200, 10, fill=1)
        c.setFillColor(colors.hexColor("#2563eb"))
        c.rect(200, y_pos - 2, score * 2, 10, fill=1) # Score * 2 to scale to 200px
        c.setFillColor(colors.black)
        c.drawString(410, y_pos, f"{score}%")
        y_pos -= 30

    # Grammar & Corrections
    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, y_pos - 20, "AI Grammar Corrections")
    c.setFont("Helvetica-Oblique", 10)
    c.setFillColor(colors.grey)
    c.drawString(50, y_pos - 35, "Below are specific improvements suggested by the AI.")
    
    c.setFillColor(colors.black)
    c.setFont("Helvetica", 11)
    text_object = c.beginText(50, y_pos - 60)
    text_object.setLeading(14)
    
    # Example corrections from Gemini results
    corrections = analysis_results['corrections'].split('\n')
    for line in corrections:
        text_object.textLine(line)
    c.drawText(text_object)

    c.save()
    return filepath