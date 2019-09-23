UPDATE employees
SET
    first_name = $1, 
    last_name = $2, 
    email = $3, 
    profile_img = $4, 
    title = $5
WHERE id = $6;