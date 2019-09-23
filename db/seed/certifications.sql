CREATE TABLE certifications (
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER REFERENCES doctors(id),
    certification_name TEXT,
    certification_desc TEXT,
    certification_id TEXT,
    certification_exp DATE,
    certification_img BYTEA
)