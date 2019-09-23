INSERT INTO doctors
(
    hospital_id, 
    first_name,
    last_name,
    email
)
VALUES
($1,$2,$3,$4)
RETURNING id;