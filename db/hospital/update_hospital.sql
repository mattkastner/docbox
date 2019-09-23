UPDATE hospitals
SET
    name = $1, 
    address_line = $2,  
    city = $3, 
    state = $4, 
    zip = $5, 
    country = $6 
WHERE id = $7;