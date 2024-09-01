// Copyright (c) 2024, PC-Giga / Florian Glashauser and contributors
// For license information, please see license.txt

frappe.ui.form.on("Sales Text Template", {
    // Set filter for Doctype field
    setup(frm) {
        frm.set_query("template_doctype", function() {
            return {
                filters: {
                    "name": ["in", ["Quotation", "Sales Order", "Sales Invoice", "Delivery Note", "Purchase Order", "Dunning"]]
                }
            }
        });
    },

	refresh(frm) {
        // Set as Introduction default button
        frm.add_custom_button(__('Set as Introduction default'), function() {
            frappe.call({
                method: "sales_texts.salestexts.doctype.sales_text_template.sales_text_template.set_as_default",
                args: {
                    doctype: frm.doc.doctype,
                    name: frm.doc.name,
                    fieldname: "is_default_introduction"
                },
                callback: function(r) {
                    frm.reload_doc();
                }
            });
        });

        // Set as Final default button
        frm.add_custom_button(__('Set as Final default'), function() {
            frappe.call({
                method: "sales_texts.salestexts.doctype.sales_text_template.sales_text_template.set_as_default",
                args: {
                    doctype: frm.doc.doctype,
                    name: frm.doc.name,
                    fieldname: "is_default_final"
                },
                callback: function(r) {
                    frm.reload_doc();
                }
            });
        });
	},
});
