SELECT 
    c.id,
    c.doctor_id,
    d.id,
    d.first_name,
    d.last_name,
    d.email,
    d.phone,
    certification_name, 
    certification_desc, 
    certification_id, 
    CAST(certification_exp AS DATE) as certification_exp, 
    (CAST(certification_exp AS DATE) - CAST($1 AS DATE)) as days_left,
    certification_img
FROM certifications c
JOIN doctors d ON c.doctor_id = d.id
ORDER BY days_left