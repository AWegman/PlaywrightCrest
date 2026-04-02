-- Create wedstrijden table if it doesn't exist
CREATE TABLE IF NOT EXISTS wedstrijden (
  id SERIAL PRIMARY KEY,
  naam VARCHAR(255) NOT NULL,
  datum DATE NOT NULL,
  afstand_km DECIMAL(8, 2),
  tijd VARCHAR(50),
  categorie VARCHAR(50),
  is_pr BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on datum for faster queries
CREATE INDEX IF NOT EXISTS idx_wedstrijden_datum ON wedstrijden(datum DESC);

-- Grant permissions
GRANT ALL PRIVILEGES ON TABLE wedstrijden TO postgres;
GRANT ALL PRIVILEGES ON SEQUENCE wedstrijden_id_seq TO postgres;
