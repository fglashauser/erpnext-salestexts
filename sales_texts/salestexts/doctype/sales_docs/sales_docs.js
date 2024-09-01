function setup(frm) {
    let doctype = frm.doctype;

    // Filter introduction templates
    frm.set_query("introduction_template", function() {
        return {
            filters: {
                "template_doctype": doctype
            }
        }
    });
    // Filter final templates
    frm.set_query("final_template", function() {
        return {
            filters: {
                "template_doctype": doctype
            }
        }
    });
}

function on_load(frm) {
    // Quit if not new document
    if (!frm.doc.__islocal) {
        return;
    }

    // Get default template: Introduction Text
    frappe.call({
        method: "sales_texts.salestexts.doctype.sales_text_template.sales_text_template.get_default",
        args: {
            doctype: frm.doc.doctype,
            fieldname: "is_default_introduction"
        },
        callback: function(r) {
            if (r.message) {
                frm.set_value("introduction_template", r.message);
            }
        }
    });

    // Get default template: Final Text
    frappe.call({
        method: "sales_texts.salestexts.doctype.sales_text_template.sales_text_template.get_default",
        args: {
            doctype: frm.doc.doctype,
            fieldname: "is_default_final"
        },
        callback: function(r) {
            if (r.message) {
                frm.set_value("final_template", r.message);
            }
        }
    });
}

function introduction_template(frm) {
    if (!frm.doc.introduction_template) {
        return;
    }
    frappe.db.get_doc("Sales Text Template", frm.doc.introduction_template)
        .then(doc => {
            frm.set_value("introduction_text", doc.text);
        });
}

function final_template(frm) {
    if (!frm.doc.final_template) {
        return;
    }
    frappe.db.get_doc("Sales Text Template", frm.doc.final_template)
        .then(doc => {
            frm.set_value("final_text", doc.text);
        });
}

frappe.ui.form.on("Quotation", { setup: setup, onload: on_load, introduction_template: introduction_template, final_template: final_template });
frappe.ui.form.on("Sales Order", { setup: setup, onload: on_load, introduction_template: introduction_template, final_template: final_template });
frappe.ui.form.on("Sales Invoice", { setup: setup, onload: on_load, introduction_template: introduction_template, final_template: final_template });
frappe.ui.form.on("Delivery Note", { setup: setup, onload: on_load, introduction_template: introduction_template, final_template: final_template });
frappe.ui.form.on("Purchase Order", { setup: setup, onload: on_load, introduction_template: introduction_template, final_template: final_template });
frappe.ui.form.on("Dunning", { setup: setup, onload: on_load, introduction_template: introduction_template, final_template: final_template });
