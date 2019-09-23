SELECT 
    id,
    doctor_id, 
    certification_name, 
    certification_desc, 
    certification_id, 
    certification_exp, 
    certification_img
FROM certifications
WHERE id = $1