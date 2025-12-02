

import fitz  # PyMuPDF
import os
from django.conf import settings

def generate_pdf_preview(proposal):
    if not proposal.file:
        return

    file_path = proposal.file.path
    preview_dir = os.path.join(settings.MEDIA_ROOT, 'previews')
    os.makedirs(preview_dir, exist_ok=True)

    preview_path = os.path.join(preview_dir, f'{proposal.id}_preview.pdf')

    doc = fitz.open(file_path)
    preview_doc = fitz.open()
    preview_doc.insert_pdf(doc, from_page=0, to_page=0)
    preview_doc.save(preview_path)
    preview_doc.close()
