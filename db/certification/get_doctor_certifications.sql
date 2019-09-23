SELECT 
    c.id,
    doctor_id, 
    certification_name, 
    certification_desc, 
    certification_id, 
    certification_exp, 
    certification_img,
    d.first_name,
    d.last_name,
    d.email,
    d.phone,
    d.address_line,
    d.city,
    d.state,
    d.zip
FROM certifications c
JOIN doctors d ON c.doctor_id = d.id
WHERE d.id = $1