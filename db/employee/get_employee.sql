SELECT 
    id,
    first_name, 
    last_name, 
    email, 
    password,
    profile_img, 
    title
FROM employees
WHERE email = $1