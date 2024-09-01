import frappe

@frappe.whitelist()
def insert_default_texts(doc, method):
    """
    Inserts the default introduction and final text for a new sales document.
    """
    pass