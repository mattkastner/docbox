SELECT 
    id 
    name, 
    address_line, 
    city, 
    state, 
    zip, 
    country
FROM hospitals
WHERE id = $1