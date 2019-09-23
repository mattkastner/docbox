SELECT 
    id,
    hospital_id, 
    first_name,
    last_name, 
    address_line, 
    city, 
    state, 
    zip, 
    country, 
    email,
    phone,
    undergraduate_college, 
    undergraduate_degree, 
    graduate_college, 
    graduate_degree, 
    residency_clinic, 
    board_certification_exam, 
    board_certification_id
FROM doctors
WHERE id = $1