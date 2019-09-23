DELETE FROM certifications WHERE doctor_id = $1;
DELETE FROM doctors WHERE id = $1;