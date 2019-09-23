SELECT 
    c.id,
    c.doctor_id, 
    d.first_name,
    d.last_name,
    c.certification_name, 
    c.certification_desc, 
    c.certification_id, 
    c.certification_exp, 
    c.certification_img
FROM certifications c
JOIN doctors d ON d.id = c.doctor_id