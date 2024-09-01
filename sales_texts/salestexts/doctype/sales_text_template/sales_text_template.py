# Copyright (c) 2024, PC-Giga / Florian Glashauser and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class SalesTextTemplate(Document):
	pass

@frappe.whitelist()
def set_as_default(doctype, name, fieldname):
	"""
	Set the given document as default in the given field.
	"""
	doc = frappe.get_doc(doctype, name)

	# first: set all documents to 0
	frappe.db.set_value(doctype, {fieldname: 1, "template_doctype": doc.template_doctype }, fieldname, 0)

	# then: set the given document to 1
	doc.set(fieldname, 1)
	doc.save()
	frappe.db.commit()
	
@frappe.whitelist()
def get_default(doctype, fieldname):
	"""
	Get the default document for the given field and doctype.
	"""
	return frappe.db.get_value("Sales Text Template", {fieldname: 1, "template_doctype": doctype}, "name")