SELECT 
    c.id,
    doctor_id, 
    certification_name, 
    certification_desc, 
    certification_id, 
    certification_exp, 
    certification_img
FROM certifications c
JOIN doctor d ON c.doctor_id = d.id;