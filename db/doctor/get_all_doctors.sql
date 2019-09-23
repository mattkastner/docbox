SELECT 
    d.id,
    d.hospital_id, 
    h.name,
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
JOIN hospitals h ON d.hospital_id = h.id;