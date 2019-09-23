UPDATE doctors
SET
    undergraduate_college = $1, 
    undergraduate_degree = $2, 
    graduate_college = $3, 
    graduate_degree = $4, 
    residency_clinic = $5, 
    board_certification_exam = $6, 
    board_certification_id = $7
WHERE
    id = $8;