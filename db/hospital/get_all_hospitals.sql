SELECT 
    h.id,
    h.name, 
    h.address_line,
    h.city, 
    h.state, 
    h.zip, 
    h.country,
    (SELECT count(*) FROM doctors d WHERE h.id = d.hospital_id) as doctor_count
FROM hospitals h
GROUP BY h.id