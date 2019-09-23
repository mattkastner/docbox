SELECT 
    d.id,
    h.name,
    h.contact,
    h.address_line as hospital_address,
    h.city as hospital_city,
    h.state as hospital_state,
    h.zip as hospital_zip,
    d.hospital_id, 
    d.first_name,
    d.last_name, 
    d.address_line, 
    d.city, 
    d.state, 
    d.zip, 
    d.country, 
    d.email,
    d.phone,
    d.undergraduate_college, 
    d.undergraduate_degree, 
    d.graduate_college, 
    d.graduate_degree, 
    d.residency_clinic, 
    d.board_certification_exam, 
    d.board_certification_id
FROM doctors d
JOIN hospitals h ON d.hospital_id = h.id
WHERE d.hospital_id = $1