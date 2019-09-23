UPDATE doctors
SET
    first_name = $1,
    last_name = $2, 
    address_line = $3,
    city = $4, 
    state = $5, 
    zip = $6, 
    country = $7, 
    email = $8,
    phone = $9
WHERE
    id = $10;