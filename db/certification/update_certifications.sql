UPDATE certifications
SET
    id = $1,
    doctor_id = $2, 
    certification_name = $3, 
    certification_desc = $4, 
    certification_id = $5, 
    certification_exp = $6, 
    certification_img = $7
WHERE
    id = $8;